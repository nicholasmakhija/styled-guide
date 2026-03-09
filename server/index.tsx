import React, { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { getStyles } from '@styled';

import { App } from '@components/App';
import {
  APP_DATA,
  CLASS_NAME_IS_DARK_MODE,
  DOCS_IS_DARK_MODE
} from '@constants';

export function render(props: AppProps) {
  const html = renderToString(
    <StrictMode>
      <App {...props} />
    </StrictMode>
  );
  const sheets = getStyles();

  return { html, sheets };
};

export function updateHTML(
  source: string,
  data: AppProps
) {
  const { html, sheets } = render(data);
  const initialData = JSON.stringify({
    currentPage: data.currentPage
  });

  const scripts = `
  <script>var ${APP_DATA} = ${initialData};</script>
  <script>
    (function () {
      const isDark =
        window.localStorage.getItem('${DOCS_IS_DARK_MODE}') === 'true';

      window.${APP_DATA}.isDark = isDark;

      if (isDark) {
        document.documentElement.classList.add('${CLASS_NAME_IS_DARK_MODE}');
      }
    })();
  </script>
  `;

  const renderedHTML = source
    .replace('<!--app-scripts-->', () => scripts)
    .replace('<!--app-styles-->', () => sheets)
    .replace('<!--app-html-->', () => html);

  return renderedHTML;
}
