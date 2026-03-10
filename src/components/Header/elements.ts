import styled, { style } from '@styled';

import { GenericIconSize, GenericButtonClears } from '@ui/Generics';
import {
  asRem,
  boxShadowBorder,
  breakpoints,
  focusVisible
} from '@utils';
import {
  CONTENT_SPACER,
  CSS_VARS,
  CUBIC_BEZIER,
  GUTTER_WIDTH,
  HEADER_HEIGHT,
  ICON_SIZE,
  NAV_WIDTH
} from '@constants';

export const HeaderRoot = styled.header({
  position: 'relative',
  zIndex: 3,
  height: asRem(HEADER_HEIGHT)
});

export const HeaderSticky = styled.div({
  position: 'fixed',
  zIndex: 2,
  top: 0,
  boxShadow: `0 ${asRem(1)} ${asRem(2)} 0 ${CSS_VARS.BORDER}`,
  width: '100%',
  height: asRem(HEADER_HEIGHT),
  padding: `${asRem(14)} 0`,
  backgroundColor: CSS_VARS.BACKGROUND.HEADER,
  WebkitBackdropFilter: 'blur(0.75rem)',
  backdropFilter: 'saturate(180%) blur(8px)'
});

const GenericHeaderItem = styled
  .generic()
  .extend(GenericIconSize, {
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: asRem(4),
    textAlign: 'center'
  });

export const HeaderSymbol = styled
  .div()
  .extend(GenericHeaderItem, {
    color: CSS_VARS.ACCENT,
    [breakpoints.up.lg]: {
      marginLeft: asRem(NAV_WIDTH - GUTTER_WIDTH - CONTENT_SPACER - ICON_SIZE)
    }
  });

export const HeaderPane = styled.div();

const GenericHeaderAction = styled
  .generic()
  .extend(GenericHeaderItem, {
    ...focusVisible(boxShadowBorder(4, CSS_VARS.ACCENT)),
    transition: CUBIC_BEZIER,
    color: CSS_VARS.COLOUR.CONTENT,
    [style.not(style.firstChild)]: {
      marginLeft: asRem(16)
    },
    [style.prop('canHover')]: {
      [style.hover]: {
        backgroundColor: '#ebedf0',
        textDecoration: 'none',
        color: '#303846'
      }
    },
    [style.prop('isRounded')]: {
      borderRadius: '50%'
    }
  });

export const HeaderLink = styled
  .a<HeaderLinkProps>()
  .extend(GenericHeaderAction, {
    textDecoration: 'none'
  });

export const Line = styled.span({
  position: 'absolute',
  display: 'block',
  transform: 'rotate(0deg)',
  transition: '0.25s ease-in-out, color 0s',
  borderRadius: asRem(1),
  width: `calc(100% - ${asRem(8)})`,
  height: asRem(2),
  backgroundColor: 'currentColor',
  [style.nthChild(1)]: {
    top: asRem(7)
  },
  [style.nthChild(2)]: {
    top: asRem(15),
    left: asRem(4)
  },
  [style.nthChild(3)]: {
    top: asRem(23)
  }
});

export const HeaderButton = styled
  .button<HeaderButtonProps>()
  .extend(GenericHeaderAction, GenericButtonClears, {
    [style.prop('isToggle')]: {
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
  })
  .withRef();
