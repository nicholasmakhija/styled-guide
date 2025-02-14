import styled, { style } from '@styled';

import { asRem, breakpoints } from '@common/utils';
import { CSS_VARS, GUTTER_WIDTH } from '@common/constants';

const contentParadigm = {
  margin: `0 0 ${asRem(24)}`,
  [style.lastChild]: {
    marginBottom: 0
  }
};

/**
 * @typedef {{
 *  children?: React.ReactNode,
 *  dangerouslySetInnerHTML?: {
 *    __html: string
 *  }
 *  ref?: React.ForwardedRef<HTMLElement>
 * }} MainProps
 */

/** @type {import('@styled').StyledComponent<MainProps>} */
export const Main = styled.main({
  flex: 1,
  paddingRight: asRem(GUTTER_WIDTH),
  paddingLeft: asRem(GUTTER_WIDTH),
  maxWidth: '100%',
  [breakpoints.up.lg]: {
    marginLeft: asRem(320)
  },
  [style.selector('a')]: {
    color: CSS_VARS.HIGHLIGHT,
    textDecoration: 'none',
    [style.hover]: {
      textDecoration: 'underline'
    },
    [style.focus]: {
      outline: 0,
      boxShadow: `0 0 0 ${asRem(4)} ${CSS_VARS.HIGHLIGHT_PALE}`,
      background: CSS_VARS.HIGHLIGHT_PALE,
      color: CSS_VARS.COLOR
    }
  },
  [style.selector('h1', 'h2', 'h3', 'h4', 'p', 'blockquote', 'pre', 'table')]: contentParadigm,
  [style.selector('h1')]: {
    // background: 'rgba(255, 204,0, 0.4)', // FIXME: alignment check
    marginTop: asRem(24),
    fontSize: asRem(32),
    lineHeight: asRem(40),
  },
  [style.selector('h2')]: {
    // background: 'rgba(255, 204,0, 0.4)', // FIXME: alignment check
    fontSize: asRem(24),
    lineHeight: asRem(32),
  },
  [style.selector('h3')]: {
    // background: 'rgba(255, 204,0, 0.4)', // FIXME: alignment check
    fontSize: asRem(18),
    lineHeight: asRem(32),
  },
  [style.selector('section')]: {
    margin: `0 0 ${asRem(48)}`
  },
  [style.selector('blockquote')]: {
    background: CSS_VARS.BACKGROUND_SECONDARY,
    padding: asRem(8),
    paddingLeft: asRem(24),
    fontSize: asRem(14),
    boxShadow: `
      0 ${asRem(2)} ${asRem(2)} 0 ${CSS_VARS.BORDER_SECONDARY},
      inset ${asRem(4)} 0 0 0 ${CSS_VARS.HIGHLIGHT}
    `,
    [style.selector('> strong')]: {
      display: 'block',
      color: CSS_VARS.HIGHLIGHT
    }
  },  
  [style.selector('code')]: {
    padding: `0 ${asRem(4)}`,
    fontSize: asRem(14),
    lineHeight: asRem(16),
    background: CSS_VARS.BACKGROUND_CODE,
    border: `${asRem(2)} solid rgba(0, 0, 0, 0.1)`,
    overflow: 'hidden',
    [style.selector('[data-comment]')]: { color: '#697098' },
    [style.selector('[data-function]')]: { color: '#61e884' },
    [style.selector('[data-keyword]')]: { color: '#eb82bf' },
    [style.selector('[data-string]')]: { color: '#e7ee98' },
    [style.selector('[data-variable]')]: { color: '#bf9eee' },
    [style.selector('[data-type]')]: { color: '#96dfef', fontStyle: 'italic' },
  },
  [style.selector('pre')]: {
    // margin: 0,
    padding: 0,
    overflow: 'hidden',
    overflowX: 'auto',
    background: CSS_VARS.BACKGROUND_PRE,
    color: CSS_VARS.COLOR_CODE,
    whiteSpace: 'pre'
  },
  [style.selector('pre > code')]: {
    display: 'block',
    padding: asRem(16),
    overflow: 'visible',
    border: 'none',
    background: 'transparent',
    whiteSpace: 'pre'
  },
  [style.selector('[data-table]')]: {
    padding: `0 ${asRem(8)}`,
    overflow: 'hidden',
    overflowX: 'auto',
    background: CSS_VARS.BACKGROUND_SECONDARY_PALE
  },
  [style.selector('table')]: {
    margin: 0,
    padding: 0,
    border: 0,
    verticalAlign: 'top',
    tableLayout: 'auto',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width: '100%',
    wordBreak: 'normal',
    [style.selector('thead', 'tbody', 'tr')]: {
      margin: 0,
      border: 0,
      verticalAlign: 'top'
    },
    [style.selector('tbody tr')]: {
      borderTop: `${asRem(1)} solid ${CSS_VARS.BORDER_SECONDARY}`
    },
    [style.selector('th')]: {
      textAlign: 'left',
      fontWeight: 'bold'
    },
    [style.selector('th', 'td')]: {
      margin: 0,
      padding: `${asRem(12)} ${asRem(8)}`,
      border: 0,
    }
  }
}).withRef();

/* FIXME: DELETE
.c { color: #697098; }
.s { color: #e7ee98; }
.k, .o { color: #eb82bf; }
.f { color: #61e884; }
.b { color: #96dfef; }
.p { color: #ffb86c; }
.n { color: #bfc7d5; } // TODO: change??
.v { color: #bf9eee; }
*/