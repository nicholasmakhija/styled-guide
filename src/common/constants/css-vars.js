import * as CSS_PROPS from './css-props';

/**
 * Returns the given custom property
 * wrapped in `var` function
 *
 * @param {string} customProperty
 * @returns {string}
 */
export const asVar = (customProperty) =>
  `var(${customProperty})`;

export const BACKGROUND_PRIMARY =
  asVar(CSS_PROPS.BACKGROUND_PRIMARY);

export const BACKGROUND_SECONDARY =
  asVar(CSS_PROPS.BACKGROUND_SECONDARY);

export const BACKGROUND_SECONDARY_PALE =
  asVar(CSS_PROPS.BACKGROUND_SECONDARY_PALE);

export const BACKGROUND_HEADER =
  asVar(CSS_PROPS.BACKGROUND_HEADER);

export const BACKGROUND_PRE =
  asVar(CSS_PROPS.BACKGROUND_PRE);

export const BACKGROUND_CODE =
  asVar(CSS_PROPS.BACKGROUND_CODE);

export const COLOR =
  asVar(CSS_PROPS.COLOR);

export const COLOR_CODE =
  asVar(CSS_PROPS.COLOR_CODE);

export const BORDER_PRIMARY =
  asVar(CSS_PROPS.BORDER_PRIMARY);

export const BORDER_SECONDARY =
  asVar(CSS_PROPS.BORDER_SECONDARY);

export const ACCENT =
  asVar(CSS_PROPS.ACCENT);

export const SKELETON =
  asVar(CSS_PROPS.SKELETON);
