import styled, { style } from '@styled';

import { asRem } from '@utils/as-rem';
import { CSS_VARS } from '@constants/tokens';
import { DISPLAY_INLINE_BLOCK, OVERFLOW_HIDDEN } from '@constants/styles';

const shimmer = 'shimmer';

export const Icon = styled
  .svg<IconProps>({
    ...DISPLAY_INLINE_BLOCK,
    stroke: 'transparent',
    fill: 'currentColor',
    pointerEvents: 'none',
    cursor: 'inherit',
    [style.not(':root')]: {
      ...OVERFLOW_HIDDEN
    },
    [style.empty]: {
      backgroundColor: CSS_VARS.SKELETON,
      animation: `${shimmer} 1.5s ease-in-out infinite`
    },
    [style.prop('width')]: (width: number) => ({
      width: asRem(width)
    }),
    [style.prop('height')]: (height: number) => ({
      height: asRem(height)
    })
  })
  .withCSS(`
    @keyframes ${shimmer} {
      0% { opacity: 0.5; }
      50% { opacity: 0.8; }
      100% { opacity: 0.5; }
    }
  `);

