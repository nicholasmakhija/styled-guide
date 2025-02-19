import { asRem } from './as-rem';

/**
 * @param {number} size 
 * @param {string} colour 
 * @returns {{
 *  boxShadow: string
 * }}
 */
export const boxShadowBorder = (size, colour) => ({
  boxShadow: `0 0 0 ${asRem(size)} ${colour}`
});

