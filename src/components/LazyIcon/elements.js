import styled, { style } from '@styled';

import { asRem } from '@common/utils';
import { CSS_VARS } from '@common/constants';

const shimmer = 'shimmer';

/**
 * @typedef {{
 *  cursor?: string,
 *  fill?: string,
 *  height?: number,
 *  stroke?: string,
 *  width?: number,
 *  hasLoader?: boolean,
 *  [key: string]: unknown
 * }} SkeletonSvgProps
 */

/** @type {import('@styled').StyledComponent<SkeletonSvgProps>} */
export const SkeletonSvg = styled
  .svg({
    display: 'inline-block',
    stroke: 'transparent',
    fill: 'currentColor',
    // verticalAlign: 'middle', // FIXME:
    pointerEvents: 'none',
    cursor: 'inherit',
    [style.not(':root')]:{
      overflow: 'hidden'
    },
    /** @param {number} width */
    [style.prop('width')]: (width) => ({
      width: asRem(width)
    }),
    /** @param {number} height */
    [style.prop('height')]: (height) => ({
      height: asRem(height)
    }),
    [style.prop('fill')]: (fill) => ({ fill }),
    [style.prop('cursor')]: (cursor) => ({ cursor }),
    [style.prop('stroke')]: (stroke) => ({ stroke }),
    [style.prop('hasLoader')]: {
      backgroundColor: CSS_VARS.SKELETON,
      animation: `${shimmer} 1.5s ease-in-out infinite`
    }
  })
  .withCSS(`
    @keyframes ${shimmer} {
      0% { opacity: 0.5; }
      50% { opacity: 0.8; }
      100% { opacity: 0.5; }
    }
  `);

