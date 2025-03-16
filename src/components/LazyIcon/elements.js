import styled, { style } from '@styled';

import { asRem } from '@common/utils';
import { CSS_VARS } from '@common/constants';

const shimmer = 'shimmer';

/** @type {import('@styled').StyledComponent<SkeletonSvgProps>} */
export const SkeletonSvg = styled
  .svg({
    display: 'inline-block',
    stroke: 'transparent',
    fill: 'currentColor',
    pointerEvents: 'none',
    cursor: 'inherit',
    [style.not(':root')]:{
      overflow: 'hidden'
    },
    [style.empty]: {
      backgroundColor: CSS_VARS.SKELETON,
      animation: `${shimmer} 1.5s ease-in-out infinite`
    },
    /** @param {number} width */
    [style.prop('width')]: (width) => ({
      width: asRem(width)
    }),
    /** @param {number} height */
    [style.prop('height')]: (height) => ({
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

