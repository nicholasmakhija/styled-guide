/**
 * Convert pixel value to rem
 *
 * @param {number} fontSize
 * @param {number} baseFontSize
 * @returns {string} rem unit value
 */
export const asRem = (fontSize, baseFontSize = 16) =>
  `${fontSize / baseFontSize}rem`;
