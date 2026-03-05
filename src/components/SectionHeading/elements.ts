import styled, { style } from '@styled';

import { GenericIconSize, GenericButtonClears } from '@ui/Generics';
import {
  asRem,
  breakpoints,
  focusVisible,
  headingWithScrollMargin,
  typography
} from '@utils';
import {
  BOX,
  CSS_VARS,
  MARGIN_ZERO,
  POSITION_ABSOLUTE,
  POSITION_RELATIVE,
  VISIBILITY_HIDDEN,
  VISIBILITY_VISIBLE
} from '@constants';

export const SectionHeadingButton = styled
  .button<SectionHeadingButtonProps>()
  .extend(GenericIconSize, GenericButtonClears, {
    ...typography(24, 32),
    ...focusVisible({
      background: CSS_VARS.ACCENT,
      color: CSS_VARS.COLOUR.CONTENT
    }),
    padding: 0,
    color: CSS_VARS.ACCENT
  });

const duration = '0.2s';
const easingFunction = 'ease-out';

const tooltipSize = 82;
const tooltipPositionTop = `calc(-100% - ${asRem(4)})`;
const tooltipAnimationName = 'fade-in-up';

export const SectionHeadingTooltip = styled
  .span<SectionHeadingTooltipProps>({
    ...BOX,
    ...POSITION_ABSOLUTE,
    top: tooltipPositionTop,
    left: '50%',
    width: asRem(tooltipSize),
    marginLeft: asRem((tooltipSize / 2) * -1),
    background: CSS_VARS.BACKGROUND.TOOLTIP,
    whiteSpace: 'nowrap',
    color: CSS_VARS.COLOUR.TOOLTIP,
    fontSize: asRem(12),
    animation: `${duration} ${easingFunction} ${tooltipAnimationName}`
  })
  .withCSS(`
  @keyframes ${tooltipAnimationName} {
    0% {
      opacity: 0;
      top: -100%;
    }
    100% {
      opacity: 1;
      top: ${tooltipPositionTop}
    }
  }
`);

export const SectionHeadingText = styled.h2<SectionHeadingTextProps>({
  ...MARGIN_ZERO,
  ...headingWithScrollMargin(24, 32)
});

export const SectionHeadingAction = styled.div({
  ...POSITION_RELATIVE,
  margin: `0 0 0 ${asRem(4)}`,
  transition: `${duration} ${easingFunction}`,
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
