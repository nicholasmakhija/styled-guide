import styled, { style } from '@styled';

import {
  CLASS_NAME_IS_DARK_MODE,
  CSS_DECLARATIONS,
  CSS_VARS
} from '@constants';

const boxSizing = `
  *,
  :after,
  :before {
    box-sizing: border-box;
  }
`;

const root = `
  ${style.root} {
    ${CSS_DECLARATIONS.LIGHT.join('\n')}
  }
`;

const rootDarkTheme = `
  .${CLASS_NAME_IS_DARK_MODE} {
    ${CSS_DECLARATIONS.DARK.join('\n')}
  }
`;

const htmlAndBody = `
  body,
  html {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    margin: 0;
    width: 100%;
    padding: 0;
  }
`;

const html = `
  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }
`;

const body = `
  body {
    background-color: ${CSS_VARS.BACKGROUND.PRIMARY};
    font-family: Verdana, sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: ${CSS_VARS.COLOUR.CONTENT};
  }
`;

export const AppRoot = styled
  .div()
  .withCSS(
    boxSizing,
    root,
    rootDarkTheme,
    html,
    htmlAndBody,
    body
  );
