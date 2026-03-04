import styled, { style } from '@styled';

import { GenericIconSize, GenericButtonClears } from '@ui/Generics';
import {
  asRem,
  breakpoints,
  headingWithScrollMargin,
  typography
} from '@utils';
import { CSS_VARS } from '@constants/tokens';

export const SectionHeadingButton = styled
  .button<SectionHeadingButtonProps>()
  .extend(GenericIconSize, GenericButtonClears, {
    ...typography(24, 34),
    margin: `0 0 0 ${asRem(4)}`,
    color: CSS_VARS.ACCENT,
    transition: '0.2s ease-out',
    [breakpoints.up.lg]: {
      opacity: 0,
      marginLeft: 0
    }
  });

export const SectionHeadingText = styled.h2<SectionHeadingTextProps>({
  ...headingWithScrollMargin(24, 32)
});

export const SectionHeadingRoot = styled.div({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  [breakpoints.up.lg]: {
    [style.hover]: {
      [style.selector(SectionHeadingButton)]: {
        opacity: 1,
        marginLeft: asRem(4)
      }
    }
  }
});
