import styled, { style } from '@styled';
import { asRem, breakpoints } from '@common/utils';
import { GUTTER_WIDTH } from '@common/constants';

const CONTAINER_WIDTHS = {
  XS: 100,
  SM: 540,
  MD: 720,
  LG: 960,
  XL: 1140
};

/**
 * @typedef {(
 *  | 'start'
 *  | 'center'
 *  | 'space-around'
 *  | 'space-between'
 *  | 'space-evenly'
 * )} JustifyContentOptions
 */

/**
 * @typedef {{
 *  children?: React.ReactNode,
 *  className?: string,
 *  flex?: JustifyContentOptions,
 *  isFluid?: boolean,
 *  isFullWidth?: boolean,
 * }
 * } ContainerProps
 */

/** @type {import('@styled').StyledComponent<ContainerProps>} */
export const Container = styled.div({
  width: `${CONTAINER_WIDTHS.XS}%`,
  paddingRight: asRem(GUTTER_WIDTH),
  paddingLeft: asRem(GUTTER_WIDTH),
  marginRight: 'auto',
  marginLeft: 'auto',
  [breakpoints.up.md]: {
    maxWidth: asRem(CONTAINER_WIDTHS.MD)
  },
  [breakpoints.up.lg]: {
    maxWidth: asRem(CONTAINER_WIDTHS.LG)
  },
  [breakpoints.up.xl]: {
    maxWidth: asRem(CONTAINER_WIDTHS.XL)
  },
  /** @param {JustifyContentOptions} justifyContent */
  [style.prop('flex')]: (justifyContent) => ({
    display: 'flex',
    justifyContent
  }),
  [style.prop('isFullWidth')]: {
    maxWidth: `${CONTAINER_WIDTHS.XS}%`
  },
  [style.prop('isFluid')]: {
    paddingRight: 0,
    paddingLeft: 0
  }
});
