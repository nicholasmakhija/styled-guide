import { sync } from 'glob';
import { dirname } from 'path';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from 'fs';
import minifier from 'html-minifier';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { getStyles } from '@styled';

import { App } from '@components/App';
import {
  APP_DATA,
  CLASS_NAME_IS_DARK_MODE,
  DOCS_IS_DARK_MODE
} from '@common/constants';

const encoding = 'utf8';

/**
 * @param {string} dir 
 * @returns {void}
 */
const createFolder = (dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, {
      recursive: true
    });
  }
};

/**
 * @param {Record<string, Page>} data
 * @param {number} index 
 * @returns {void}
 */
const createJSON = (data, index) => {
  if (index > 0) return;

  const dir = 'dist/json';
  
  createFolder(dir);

  writeFileSync(`${dir}/pages.json`, JSON.stringify({
    pages: data
  }));
};

/**
 * @param {string} sheets
 * @param {string} data
 * @param {string} html
 * @returns {string}
 */
export const renderHTML = (sheets, data, html) =>
// eslint-disable-next-line @stylistic/indent
`<!DOCTYPE html>
<html lang="en">
<head>
  <title>Styled: Documentation</title>

  <link rel="shortcut icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
  <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">

  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="description" content="@n3e/styled documentation site">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="format-detection" content="telephone=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">

  <meta property="og:locale" content="en_AU">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Styled Documentation">
  <meta property="og:description" content="@n3e/styled documentation site">
  <meta property="og:url" content="https://styled.guide/">
  <meta property="og:site_name" content="Styled Guide">
  <meta property="og:image:secure_url" content="https://styled.guide/images/og-image.jpg">
  <meta property="og:image" content="https://styled.guide/images/og-image.jpg">

  ${sheets}
  <script>var ${APP_DATA} = ${data};</script>
  <script>
    (function () {
      const isDark = window.localStorage.getItem('${DOCS_IS_DARK_MODE}') === 'true';

      window.${APP_DATA}.isDark = isDark;

      if (isDark) {
        document.documentElement.classList.add('${CLASS_NAME_IS_DARK_MODE}');
      }
    })();
  </script>
  <script defer src="/js/index.js"></script>
</head>
<body>
  <div id="root">${html}</div>
  
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-NJPJ25DGQH"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-NJPJ25DGQH');
  </script>
</body>
</html>`;

/**
 * @param {string} str 
 * @param {RegExp} regex 
 * @returns {{
 *  list: (RegExpMatchArray|string)[],
 *  matched: string
 * }}
 */
const execData = (str, regex) => {
  const matchedArray = str.match(regex);
  const cleaned = matchedArray || [];

  return {
    list: cleaned,
    matched: cleaned.length ? cleaned[1] : ''
  };
};

/**
 * @param {string} heading 
 * @returns {Section}
 */
const getSectionData = (heading) => ({
  id: execData(heading, /id="(.*?)"/).matched,
  text: execData(heading, />(.*?)<\//).matched
});

const templates = 'src/pages';

sync(`${templates}/**/index.html`).map((file) => {
  const output = file.replace(templates, 'dist');
  const dir = dirname(output);

  createFolder(dir);

  const raw = readFileSync(file, encoding);
  const order = +execData(raw, /<!--order:([^$]+?)-->/).matched;

  const title = execData(raw, /<h1>([^$]+?)<\/h1>/).matched;
  const route = title.toLowerCase().replace('basics', '');
  const path = `/${route}`;

  // for all h2 and h3 use /<h[2-3] id="(.*?)">([^$]+?)<\/h[2-3]>/g
  const headings = execData(raw, /<h2 id="(.*?)">([^$]+?)<\/h2>/g).list;
  const sections = headings.map(getSectionData);

  const content = minifier.minify(raw, {
    collapseWhitespace: true,
    removeComments: true
  });

  return {
    content,
    order,
    output,
    path,
    sections,
    title
  };
}).sort((a, b) => (
  a.order - b.order
)).forEach(({
  output,
  path
}, index, array) => {

  /** @type {Record<string, Page>} */
  const pages = array.reduce((acc, {
    content,
    path,
    title,
    sections
  }) => ({
    ...acc,
    [path]: {
      content,
      path,
      title,
      sections
    }
  }), {});

  const stringifiedData = JSON.stringify({
    currentPage: path
  });

  /** @type {AppProps} */
  const data = {
    isDark: false,
    currentPage: path,
    pages
  };

  const renderedHTML = renderToString(<App {...data} />);
  const sheets = getStyles();
  const html = renderHTML(sheets, stringifiedData, renderedHTML);

  writeFileSync(output, html);

  createJSON(pages, index);
});
