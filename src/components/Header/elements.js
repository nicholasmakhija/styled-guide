import styled, { style } from '@styled';

import { asRem, breakpoints } from '@common/utils';
import { CSS_VARS } from '@common/constants';

const HEADER_HEIGHT = 60;

export const HeaderRoot = styled.header({
  position: 'relative',
  zIndex: 3,
  height: asRem(HEADER_HEIGHT)
});

export const HeaderSticky = styled.div({
  position: 'fixed',
  zIndex: 2,
  top: 0,
  padding: `${asRem(14)} 0`,
  width: '100%',
  height: asRem(HEADER_HEIGHT),
  backgroundColor: CSS_VARS.BACKGROUND_HEADER,
  backdropFilter: 'saturate(180%) blur(8px)',
  WebkitBackdropFilter: 'blur(0.75rem)',
  boxShadow: `0 ${asRem(1)} ${asRem(2)} 0 ${CSS_VARS.BORDER_SECONDARY}`
});

export const HeaderBrand = styled.div({
  padding: `${asRem(4)} 0`
});

export const HeaderActions = styled.div();

/**
 * @typedef {{
 *  children?: React.ReactNode,
 *  canHover?: boolean,
 *  isRounded?: boolean,
 * }} HeaderActionProps
 */

const HeaderAction = styled.generic({
  margin: 0,
  padding: asRem(4),
  width: asRem(32),
  height: asRem(32),
  display: 'inline-block',
  textAlign: 'center',
  verticalAlign: 'middle',
  color: CSS_VARS.COLOR,
  transition: '0.3s cubic-bezier(0.2, 0, 0, 1)',
  [style.focus]: {
    outline: 0,
    boxShadow: `0 0 0 ${asRem(4)} ${CSS_VARS.HIGHLIGHT_PALE}`
  },
  [style.not(style.firstChild)]: {
    marginLeft: asRem(16)
  },
  [style.prop('canHover')]: {
    [style.hover]: {
      textDecoration: 'none',
      color: '#303846', // FIXME: update to use css variable
      backgroundColor: '#ebedf0' // FIXME: update to use css variable
    }
  },
  [style.prop('isRounded')]: {
    borderRadius: '50%'
  }
});

/**
 * @typedef {HeaderActionProps & {
 *  href: string,
 *  target?: string
 * }} HeaderLinkProps
 */

/** @type {import('@styled').StyledComponent<HeaderLinkProps>} */
export const HeaderLink = styled
  .a()
  .extend(HeaderAction, {
    textDecoration: 'none',
  });

export const Line = styled.span({
  position: 'absolute',
  display: 'block',
  width: `calc(100% - ${asRem(8)})`,
  height: asRem(2),
  transform: 'rotate(0deg)',
  transition: '0.25s ease-in-out, color 0s',
  backgroundColor: 'currentColor',
  [style.nthChild(1)]: {
    top: asRem(7)
  },
  [style.nthChild(2)]: {
    top: asRem(15),
    left: asRem(4),
  },
  [style.nthChild(3)]: {
    top: asRem(23)
  }
});

/**
 * @typedef {HeaderActionProps & {
 *  isMenu?: boolean,
 *  isOpen?: boolean,
 *  onClick?: (e: Event) => void,
 * }} HeaderButtonProps
 */

/** @type {import('@styled').StyledComponent<HeaderButtonProps>} */
export const HeaderButton = styled
  .button()
  .extend(HeaderAction, {
    border: 'none',
    backgroundColor: 'transparent',
    appearance: 'none',
    cursor: 'pointer',
    [style.prop('isMenu')]: {
      position: 'relative',
      overflow: 'hidden',
      [breakpoints.up.lg]: {
        display: 'none'
      }
    },
    [style.prop('isOpen')]: {
      [style.selector(Line)]: {
        [style.nthChild(1)]: {
          top: asRem(15),
          transform: 'rotate(135deg)'
        },
        [style.nthChild(2)]: {
          left: '100%',
          opacity: 0
        },
        [style.nthChild(3)]: {
          top: asRem(15),
          transform: 'rotate(-135deg)'
        }
      }
    }
  });