import { readFileSync } from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { getStyles } from '@n3e/styled';

import { createResource } from './create';
import { getTemplateData } from './get-template-data';
import { getServerSideProps } from './get-server-side-props';
import { renderHTML } from './render-html';

import { App } from '@components/App';

const isHMR = process.argv.includes('vite-hmr');
const outDir = isHMR ? 'bin' : 'dist';
const pages = getServerSideProps();

createResource('dist/json/pages.json', JSON.stringify({
  pages: pages
}));

if (isHMR) {
  const file = 'index.jsx';
  const entry = readFileSync(`src/${file}`, 'utf8');
  const viteEntry = entry.replace('; charset=utf-8', '');

  createResource(`${outDir}/${file}`, viteEntry);
}

getTemplateData().forEach(({ page, path }) => {
  /** @type {AppProps} */
  const data = {
    isDark: false,
    currentPage: path,
    pages
  };

  const renderedHTML = renderToString(<App {...data} />);
  const sheets = getStyles();
  const stringifiedData = JSON.stringify({
    currentPage: path
  });
  const scriptAttr = isHMR
    ? 'type="module" src="/index.jsx"'
    : 'defer src="/js/index.js"';

  const html = renderHTML(renderedHTML, sheets, stringifiedData, scriptAttr);

  const output = outDir + page;

  createResource(output, html);
});
