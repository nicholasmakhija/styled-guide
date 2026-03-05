import styled, { style } from '@styled';

import { GenericIconSize, GenericButtonClears } from '@ui/Generics';
import {
  asRem,
  breakpoints,
  headingWithScrollMargin,
  typography
} from '@utils';
import {
  BOX,
  CSS_VARS,
  MARGIN_ZERO,
  OUTLINE_ZERO,
  POSITION_ABSOLUTE,
  POSITION_RELATIVE,
  TRANSITION_EASE_OUT,
  VISIBILITY_HIDDEN,
  VISIBILITY_VISIBLE
} from '@constants';

export const SectionHeadingButton = styled
  .button<SectionHeadingButtonProps>()
  .extend(GenericIconSize, GenericButtonClears, {
    ...typography(24, 32),
    padding: 0,
    color: CSS_VARS.ACCENT,
    [style.focusVisible]: {
      ...OUTLINE_ZERO,
      background: CSS_VARS.ACCENT,
      color: CSS_VARS.COLOUR.CONTENT
    }
  });

const toggleTipSize = 82;

export const SectionHeadingTooltip = styled.span<SectionHeadingTooltipProps>({
  ...BOX,
  ...POSITION_ABSOLUTE,
  ...TRANSITION_EASE_OUT,
  top: '-100%',
  left: '50%',
  width: asRem(toggleTipSize),
  marginLeft: asRem((toggleTipSize / 2) * -1),
  background: CSS_VARS.BACKGROUND.TOOLTIP,
  whiteSpace: 'nowrap',
  color: CSS_VARS.COLOUR.TOOLTIP,
  fontSize: asRem(12),
  opacity: 0,
  [style.prop('isVisible')]: {
    top: `calc(-100% - ${asRem(4)})`,
    opacity: 1
  }
});

export const SectionHeadingText = styled.h2<SectionHeadingTextProps>({
  ...MARGIN_ZERO,
  ...headingWithScrollMargin(24, 32)
});

export const SectionHeadingAction = styled.div({
  ...POSITION_RELATIVE,
  ...TRANSITION_EASE_OUT,
  margin: `0 0 0 ${asRem(4)}`,
  [breakpoints.up.lg]: {
    ...VISIBILITY_HIDDEN,
    opacity: 0,
    marginLeft: 0
  }
});

export const SectionHeadingRoot = styled.div({
  ...POSITION_RELATIVE,
  display: 'flex',
  alignItems: 'center',
  [breakpoints.up.lg]: {
    [style.hover]: {
      [style.selector(SectionHeadingAction)]: {
        ...VISIBILITY_VISIBLE,
        opacity: 1,
        marginLeft: asRem(4)
      }
    }
  }
});
