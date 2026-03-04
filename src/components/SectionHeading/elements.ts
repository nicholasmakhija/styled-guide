import styled, { style } from '@styled';

import { GenericIconSize, GenericButtonClears } from '@ui/Generics';
import {
  asRem,
  boxShadowBorder,
  breakpoints,
  headingWithScrollMargin,
  typography
} from '@utils';
import { CSS_VARS } from '@constants/tokens';

export const SectionHeadingButton = styled
  .button<SectionHeadingButtonProps>()
  .extend(GenericIconSize, GenericButtonClears, {
    ...typography(24, 32),

    color: CSS_VARS.ACCENT,
    [style.focus]: {
      outline: 0,
      background: CSS_VARS.ACCENT,
      color: CSS_VARS.COLOUR.CONTENT
    }
  });

export const SectionHeadingTooltip = styled.span<SectionHeadingTooltipProps>({
  ...boxShadowBorder(2, CSS_VARS.BORDER),
  position: 'absolute',
  top: '-100%',
  left: '-50%',
  transform: 'translateX(50%)',
  padding: `0 ${asRem(4)}`,
  borderRadius: asRem(4),
  background: CSS_VARS.BACKGROUND.TOOLTIP,
  color: CSS_VARS.COLOUR.TOOLTIP,
  fontSize: asRem(12),
  opacity: 0,
  transition: '0.2s ease-out',
  [style.prop('isVisible')]: {
    top: `calc(-100% - ${asRem(4)})`,
    opacity: 1
  }
});

export const SectionHeadingText = styled.h2<SectionHeadingTextProps>({
  ...headingWithScrollMargin(24, 32),
  margin: 0
});

export const SectionHeadingAction = styled.div({
  position: 'relative',
  minWidth: asRem(120),
  margin: `0 0 0 ${asRem(4)}`,
  transition: '0.2s ease-out',
  [breakpoints.up.lg]: {
    opacity: 0,
    marginLeft: 0,
    visibility: 'hidden'
  }
});

export const SectionHeadingRoot = styled.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  [breakpoints.up.lg]: {
    [style.hover]: {
      [style.selector(SectionHeadingAction)]: {
        opacity: 1,
        marginLeft: asRem(4),
        visibility: 'visible'
      }
    }
  }
});
