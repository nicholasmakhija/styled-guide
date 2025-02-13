
import { sync } from 'glob';
import { dirname, sep } from 'path';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from 'fs';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { getStyles } from '@n3e/styled';

import { App } from '@components/App';

/**
 * @param {string} sheets
 * @param {string} data
 * @param {string} html
 * @returns {string}
 */
export const renderHTML = (sheets, data, html) =>
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
  <script>var data = ${data};</script>
  <script defer src="/js/index.js"></script>
</head>
<body>
  <div id="root">${html}</div>
</body>
</html>`;

sync('src/app/**/index.html').map((file) => {
  const output = file.replace('src/app', 'dist');
  const dir = dirname(output);

  if (!existsSync(dir)) {
    mkdirSync(dir, {
      recursive: true
    });
  }

  const content = readFileSync(file, 'utf8');
  const heading = content.match(/<h1>([^$]+?)<\/h1>/);
  const sections = (content.match(/<h2>/g) || []).length;
  const title = heading ? heading[1] : '';

  const route = title.toLowerCase().replace('basics', '');
  const path = `/${route}`;

  return {
    content,
    output,
    path,
    sections,
    title
  };
}).forEach(({
  output,
  path
}, _, array) => {
  const data = {
    active: path,
    pages: array.map(({
      content,
      path,
      title,
      sections
    }) => ({
      content,
      path,
      title,
      sections
    }))
  };

  const stringifiedData = JSON.stringify(data);
  const renderedHTML = renderToString(
    <App {...data} />
  );
  const sheets = getStyles();
  const html = renderHTML(sheets, stringifiedData, renderedHTML);

  writeFileSync(output, html);
});
