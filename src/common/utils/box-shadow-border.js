import { asRem } from './as-rem';

/**
 * @param {number} size 
 * @param {string} colour 
 * @returns {BoxShadow}
 */
export const boxShadowBorder = (size, colour) => ({
  boxShadow: `0 0 0 ${asRem(size)} ${colour}`
});

