import { APP_DATA } from '@common/constants/globals.js';
import {
  CLASS_NAME_IS_DARK_MODE,
  DOCS_IS_DARK_MODE
} from '@common/constants/theme.js';

/**
 * @param {string} html
 * @param {string} sheets
 * @param {string} data
 * @param {string} scriptAttributes
 * @returns {string}
 */
export const renderHTML = (
  html,
  sheets,
  data,
  scriptAttributes
) =>
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
  <script ${scriptAttributes}></script>
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
