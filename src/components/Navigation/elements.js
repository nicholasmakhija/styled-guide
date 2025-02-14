import styled, { style } from '@styled';

import { asRem, breakpoints } from '@common/utils';
import { CSS_VARS } from '@common/constants';

const NAV_WIDTH = 320;

/**
 * @typedef {{
 *  children?: React.ReactNode,
 *  isOpen?: boolean
 * }} NavProps
 */

/** @type {import('@styled').StyledComponent<NavProps>} */
export const Nav = styled.nav({
  position: 'fixed',
  zIndex: 2,
  left: asRem(-NAV_WIDTH),
  width: asRem(NAV_WIDTH),
  height: '100%',
  // opacity: 0, // FIXME:
  visibility: 'hidden',
  textAlign: 'right',
  transition: '0.3s cubic-bezier(0.2, 0, 0, 1)',
  [style.before]: {
    content: '',
    position: 'fixed',
    inset: 0,
    opacity: 0,
    visibility: 'hidden',
    background: 'rgba(0, 0, 0, 0.6)',
    transition: '0.3s cubic-bezier(0.2, 0, 0, 1)'
  },
  [breakpoints.up.lg]: {
    left: 'auto',
    // opacity: 1 // FIXME:
    visibility: 'visible'
  },
  [style.prop('isOpen')]: {
    left: 0,
    visibility: 'visible',
    [style.before]: {
      opacity: 1,
      visibility: 'visible'
    }
  },
});

/**
 * @typedef {{
 *  children?: React.ReactNode,
 *  ref?: React.ForwardedRef<HTMLDivElement>
 * }} NavContentProps
 */

/** @type {import('@styled').StyledComponent<NavContentProps>} */
export const NavContent = styled
  .div({
    position: 'relative',
    height: '100%',
    padding: `${asRem(24)} ${asRem(24)} ${asRem(72)}`,
    overflow: 'hidden',
    overflowY: 'auto',
    backgroundColor: CSS_VARS.BACKGROUND_PRIMARY
  })
  .withRef();

export const NavList = styled.ul({
  position: 'relative',
  listStyle: 'none',
  // margin: `0 0 ${asRem(24)}`, // FIXME:
  margin: 0,
  padding: 0,
  [style.after]: {
    [breakpoints.up.lg]: {
      content: '',
      position: 'absolute',
      top: 0,
      right: asRem(-16),
      width: asRem(1),
      height: '100%',
      background: CSS_VARS.BORDER_PRIMARY
    }
  }
});

export const NavItem = styled.li({
  // margin: `0 0 ${asRem(4)}`, // FIXME:
  // padding: 0 // FIXME:
  margin: 0,
  padding: `0 0 ${asRem(4)}`,
  [style.or(
    style.firstChild,
    style.lastChild
  )]: {
    paddingBottom: asRem(24)
  }
});

/**
 * @typedef {{
 *  children?: React.ReactNode,
 *  href: string,
 *  target?: string,
 *  isActive?: boolean,
 *  isTitle?: boolean,
 *  onClick?: (e: Event) => void 
 * }} NavLinkProps
 */

/** @type {import('@styled').StyledComponent<NavLinkProps>} */
export const NavLink = styled.a({
  position: 'relative',
  display: 'inline-block',
  padding: asRem(4),
  textDecoration: 'none',
  background: 'transparent',
  // background: 'rgba(255, 204,0, 0.4)', // FIXME: alignment check
  // boxShadow: `inset 0 0 0 4px ${CSS_VARS.BACKGROUND_PRIMARY}`, // FIXME: alignment check
  color: CSS_VARS.COLOR,
  cursor: 'pointer',
  transition: '0.3s cubic-bezier(0.2, 0, 0, 1)',
  [style.hover]: {
    color: CSS_VARS.HIGHLIGHT
  },
  [style.focus]: {
    outline: 0
  },
  [style.and(
    style.not(style.hover),
    style.focus
  )]: {
    background: CSS_VARS.HIGHLIGHT
  },
  [style.prop('isTitle')]: {
    fontWeight: 'bold',
    fontSize: asRem(24),
    lineHeight: asRem(32),
    [style.after]: {
      content: '',
      position: 'absolute',
      right: asRem(-16),
      width: asRem(0),
      height: asRem(32),
      background: CSS_VARS.HIGHLIGHT_PALE,
      transition: 'width 0.3s cubic-bezier(0.2, 0, 0, 1)',
    },
    [style.and(
      style.not(style.hover),
      style.focus
    )]: {
      background: 'none',
      [style.after]: {
        width: asRem(12)
      }
    }
  },
  [style.props.all('isTitle', 'isActive')]: {
    cursor: 'default',
    color: CSS_VARS.HIGHLIGHT,
    [style.after]: {
      width: asRem(8)
    }
  }
});