import styled, { style } from '@styled';

import { asRem, breakpoints } from '@common/utils';
import {
  BORDER_SIZE,
  CONTENT_SPACER,
  CSS_VARS,
  HEADER_HEIGHT,
  NAV_LINK_PADDING,
  NAV_WIDTH
} from '@common/constants';

/** @type {import('@styled').StyledComponent<NavProps>} */
export const Nav = styled.nav({
  position: 'fixed',
  top: asRem(HEADER_HEIGHT),
  left: asRem(-NAV_WIDTH),
  width: asRem(NAV_WIDTH),
  height: '100%',
  visibility: 'hidden',
  textAlign: 'right',
  transition: '0.3s cubic-bezier(0.2, 0, 0, 1)',
  [breakpoints.up.lg]: {
    left: 'auto',
    visibility: 'visible'
  },
  [style.prop('isOpen')]: {
    [breakpoints.down.lg]: {
      zIndex: 2,
      left: 0,
      visibility: 'visible',
      [style.before]: {
        content: '',
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        transition: '0.3s cubic-bezier(0.2, 0, 0, 1)'
      }
    }
  },
});

/** @type {import('@styled').StyledComponent<NavContentProps>} */
export const NavContent = styled
  .div({
    position: 'relative',
    height: '100%',
    paddingTop: asRem(CONTENT_SPACER),
    paddingBottom: asRem(72),
    overflow: 'hidden',
    overflowY: 'auto',
    backgroundColor: CSS_VARS.BACKGROUND_PRIMARY
  })
  .withRef();

export const NavList = styled.ul({
  position: 'relative',
  listStyle: 'none',
  margin: 0,
  padding: `0 ${asRem(CONTENT_SPACER)}`,
  [style.after]: {
    [breakpoints.up.lg]: {
      content: '',
      position: 'absolute',
      top: 0,
      right: 0,
      width: asRem(BORDER_SIZE),
      height: '100%',
      background: CSS_VARS.BORDER_PRIMARY
    }
  }
});

export const NavItem = styled.li({
  margin: 0,
  padding: `0 0 ${asRem(4)}`,
  [style.or(
    style.firstChild,
    style.lastChild
  )]: {
    paddingBottom: asRem(CONTENT_SPACER)
  }
});

/** @type {import('@styled').StyledComponent<NavLinkProps>} */
export const NavLink = styled.a({
  position: 'relative',
  display: 'inline-block',
  padding: asRem(NAV_LINK_PADDING),
  textDecoration: 'none',
  background: 'transparent',
  color: CSS_VARS.COLOR,
  cursor: 'pointer',
  transition: '0.3s cubic-bezier(0.2, 0, 0, 1)',
  [style.hover]: {
    color: CSS_VARS.ACCENT
  },
  [style.focus]: {
    outline: 0
  },
  [style.and(
    style.not(style.hover),
    style.focus
  )]: {
    background: CSS_VARS.ACCENT
  },
  [style.prop('isTitle')]: {
    fontWeight: 'bold',
    fontSize: asRem(24),
    lineHeight: asRem(32),
    [style.after]: {
      content: '',
      position: 'absolute',
      right: asRem(-CONTENT_SPACER),
      width: asRem(0),
      height: asRem(32),
      background: CSS_VARS.ACCENT,
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
    color: CSS_VARS.ACCENT,
    [style.after]: {
      width: asRem(8)
    }
  }
});