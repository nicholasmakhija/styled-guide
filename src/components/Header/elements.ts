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
  DISPLAY_BLOCK,
  DISPLAY_INLINE_BLOCK,
  TRANSITION_CUBIC_BEZIER,
  GUTTER_WIDTH,
  HEADER_HEIGHT,
  NAV_WIDTH,
  OVERFLOW_HIDDEN,
  POSITION_ABSOLUTE,
  POSITION_RELATIVE,
  TEXT_DECORATION_NONE,
  TOP_ZERO
} from '@constants';

export const HeaderRoot = styled.header({
  ...POSITION_RELATIVE,
  zIndex: 3,
  height: asRem(HEADER_HEIGHT)
});

export const HeaderSticky = styled.div({
  ...TOP_ZERO,
  position: 'fixed',
  zIndex: 2,
  padding: `${asRem(14)} 0`,
  width: '100%',
  height: asRem(HEADER_HEIGHT),
  backgroundColor: CSS_VARS.BACKGROUND.HEADER,
  backdropFilter: 'saturate(180%) blur(8px)',
  WebkitBackdropFilter: 'blur(0.75rem)',
  boxShadow: `0 ${asRem(1)} ${asRem(2)} 0 ${CSS_VARS.BORDER}`
});

export const HeaderBrand = styled.div({
  padding: `${asRem(4)} 0`,
  color: CSS_VARS.ACCENT,
  [breakpoints.up.lg]: {
    marginLeft: asRem(-GUTTER_WIDTH),
    paddingRight: asRem(CONTENT_SPACER),
    paddingLeft: asRem(CONTENT_SPACER),
    width: asRem(NAV_WIDTH),
    textAlign: 'right'
  }
});

export const HeaderActions = styled.div();

const HeaderAction = styled
  .generic()
  .extend(GenericIconSize, {
    ...DISPLAY_INLINE_BLOCK,
    ...TRANSITION_CUBIC_BEZIER,
    ...focusVisible(boxShadowBorder(4, CSS_VARS.ACCENT)),
    padding: asRem(4),
    textAlign: 'center',
    verticalAlign: 'middle',
    color: CSS_VARS.COLOUR.CONTENT,
    [style.not(style.firstChild)]: {
      marginLeft: asRem(16)
    },
    [style.prop('canHover')]: {
      [style.hover]: {
        ...TEXT_DECORATION_NONE,
        color: '#303846',
        backgroundColor: '#ebedf0'
      }
    },
    [style.prop('isRounded')]: {
      borderRadius: '50%'
    }
  });

export const HeaderLink = styled
  .a<HeaderLinkProps>()
  .extend(HeaderAction, TEXT_DECORATION_NONE);

export const Line = styled.span({
  ...DISPLAY_BLOCK,
  ...POSITION_ABSOLUTE,
  width: `calc(100% - ${asRem(8)})`,
  height: asRem(2),
  borderRadius: asRem(1),
  transform: 'rotate(0deg)',
  transition: '0.25s ease-in-out, color 0s',
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
  .extend(HeaderAction, GenericButtonClears, {
    [style.prop('isToggle')]: {
      ...OVERFLOW_HIDDEN,
      ...POSITION_RELATIVE,
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
