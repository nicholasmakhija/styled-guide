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
  TYPOGRAPHY
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
    ...TYPOGRAPHY.TINY,
    position: 'absolute',
    top: tooltipPositionTop,
    left: '50%',
    animation: `${duration} ${easingFunction} ${tooltipAnimationName}`,
    marginLeft: asRem((tooltipSize / 2) * -1),
    width: asRem(tooltipSize),
    background: CSS_VARS.BACKGROUND.TOOLTIP,
    textAlign: 'center',
    color: CSS_VARS.COLOUR.TOOLTIP
  })
  .withCSS(`
  @keyframes ${tooltipAnimationName} {
    0% {
      top: -100%;
      opacity: 0;
    }
    100% {
      top: ${tooltipPositionTop};
      opacity: 1;
    }
  }
`);

export const SectionHeadingText = styled.h2<SectionHeadingTextProps>(
  withScrollMarginTop({
    ...TYPOGRAPHY.H2,
    margin: 0
  })
);

export const SectionHeadingAction = styled.div({
  position: 'relative',
  transition: `${duration} ${easingFunction}`,
  margin: `0 0 0 ${asRem(4)}`,
  [breakpoints.up.lg]: {
    opacity: 0,
    visibility: 'hidden',
    marginLeft: 0
  }
});

export const SectionHeadingRoot = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  [breakpoints.up.lg]: {
    [style.hover]: {
      [style.selector(SectionHeadingAction)]: {
        opacity: 1,
        visibility: 'visible',
        marginLeft: asRem(4)
      }
    }
  }
});
