import styled, { style } from '@styled';

import { CLASS_NAME_IS_DARK_MODE } from '@common/utils';
import {
  CSS_PROPS,
  CSS_VARS,
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
    ${CSS_PROPS.BACKGROUND_PRIMARY}: #fff;
    ${CSS_PROPS.BACKGROUND_SECONDARY}: rgb(247, 247, 247);
    ${CSS_PROPS.BACKGROUND_HEADER}: rgba(247, 247, 247, 0.8);
    ${CSS_PROPS.BACKGROUND_PRE}: #2d3440;
    ${CSS_PROPS.BACKGROUND_CODE}: #f6f7f8;
    ${CSS_PROPS.COLOR}: #1c1c1c;
    ${CSS_PROPS.COLOR_CODE}: #f5f5f4;
    ${CSS_PROPS.BORDER_PRIMARY}: #ccd0d5;
    ${CSS_PROPS.BORDER_SECONDARY}: rgba(0, 0, 0, 0.1);
    ${CSS_PROPS.HIGHLIGHT}: rgb(255, 105, 149);
    ${CSS_PROPS.HIGHLIGHT_PALE}: rgba(255, 105, 149, 0.7);
    ${CSS_PROPS.SKELETON}: rgba(0, 0, 0, 0.11);
  }
`;
    
const rootDarkTheme = `
  .${CLASS_NAME_IS_DARK_MODE} {
    ${CSS_PROPS.BACKGROUND_CODE}: rgba(255, 255, 255, 0.10);
    ${CSS_PROPS.BACKGROUND_PRIMARY}: rgb(29, 33, 37);
    ${CSS_PROPS.BACKGROUND_SECONDARY}: #161a1d;
    ${CSS_PROPS.BACKGROUND_HEADER}: rgba(29, 33, 37, 0.8);
    ${CSS_PROPS.COLOR}: #e8e8e8;
    ${CSS_PROPS.BORDER_SECONDARY}: rgba(235, 236, 240, 0.1);
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
    color: ${CSS_VARS.COLOR};
    background-color: ${CSS_VARS.BACKGROUND_PRIMARY};
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
  );