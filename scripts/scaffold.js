import React from 'react';
import { renderToString } from 'react-dom/server';
import { getStyles } from '@n3e/styled';

import { copy, create } from './resource';
import { templateData } from './get-template-data';
import { getServerSideProps } from './get-server-side-props';
import { renderHTML } from './render-html';

import { App } from '@components/App';

const file = 'index.jsx';
const entry = `src/${file}`;

const isHMR = process.argv.includes('--is-hmr');
const isStart = process.argv.includes('--is-start');
const isBuild = process.argv.includes('--is-build');
const isHTML = process.argv.includes('--is-html');
const hasEntryFileChanged = process.argv.includes(entry);

const pages = getServerSideProps();

if (isBuild || isStart || isHTML) {
  create('dist/json/pages.json', JSON.stringify({
    pages: pages
  }));
}

if (isHMR && (isStart || hasEntryFileChanged)) {
  copy(entry, `bin/${file}`);
}

templateData.forEach(({ page, path }) => {
  /** @type {AppProps} */
  const props = {
    isDark: false,
    currentPage: path,
    pages
  };

  const html = renderToString(<App {...props} />);
  const sheets = getStyles();
  const data = JSON.stringify({
    currentPage: path
  });
  const scriptAttr = isHMR
    ? 'type="module" src="/index.jsx"'
    : 'defer src="/js/index.js"';

  const renderedHTML = renderHTML(html, sheets, data, scriptAttr);

  const outDir = isHMR ? 'bin' : 'dist';
  const output = outDir + page;

  create(output, renderedHTML);
});
