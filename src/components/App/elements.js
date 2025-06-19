import styled, { style } from '@styled';

import { FooterRoot } from '@components/Footer/elements';
import {
  CLASS_NAME_IS_DARK_MODE,
  CSS_DECLARATIONS,
  CSS_VARS
} from '@common/constants';

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
    margin: 0;
    padding: 0;
    width: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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
    font-size: 16px;
    line-height: 24px;
    font-family: Verdana, sans-serif;
    color: ${CSS_VARS.COLOUR.CONTENT};
    background-color: ${CSS_VARS.BACKGROUND.PRIMARY};
  }
`;

const footerDarkThemeOverride = `
  .${CLASS_NAME_IS_DARK_MODE} ${FooterRoot} {
    background: transparent;
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
    body,
    footerDarkThemeOverride
  );
