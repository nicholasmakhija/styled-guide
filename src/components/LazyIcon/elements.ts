import styled, { style } from '@styled';

import { asRem } from '@utils/as-rem';
import { CSS_VARS } from '@constants/tokens';

const shimmer = 'shimmer';

export const Icon = styled
  .svg<IconProps>({
    display: 'inline-block',
    cursor: 'inherit',
    pointerEvents: 'none',
    stroke: 'transparent',
    fill: 'currentColor',
    [style.not(':root')]: {
      overflow: 'hidden'
    },
    [style.empty]: {
      animation: `1.2s ease-in-out ${shimmer} infinite`,
      backgroundColor: CSS_VARS.SKELETON
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

