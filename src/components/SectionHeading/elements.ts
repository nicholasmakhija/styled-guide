import styled, { style } from '@styled';

import { GenericIconSize, GenericButtonClears } from '@ui/Generics';
import {
  asRem,
  breakpoints,
  focusVisible,
  withScrollMarginTop
} from '@utils';
import {
  BOX,
  CSS_VARS,
  MARGIN_ZERO,
  POSITION_ABSOLUTE,
  POSITION_RELATIVE,
  TYPOGRAPHY,
  VISIBILITY_HIDDEN,
  VISIBILITY_VISIBLE
} from '@constants';

export const SectionHeadingButton = styled
  .button<SectionHeadingButtonProps>()
  .extend(GenericIconSize, GenericButtonClears, {
    ...TYPOGRAPHY.H2,
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
    ...TYPOGRAPHY.TINY,
    top: tooltipPositionTop,
    left: '50%',
    width: asRem(tooltipSize),
    marginLeft: asRem((tooltipSize / 2) * -1),
    background: CSS_VARS.BACKGROUND.TOOLTIP,
    textAlign: 'center',
    color: CSS_VARS.COLOUR.TOOLTIP,
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

export const SectionHeadingText = styled.h2<SectionHeadingTextProps>(
  withScrollMarginTop({
    ...MARGIN_ZERO,
    ...TYPOGRAPHY.H2
  })
);

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
