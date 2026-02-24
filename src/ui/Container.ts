import styled, { style } from '@styled';
import { asRem, breakpoints } from '@utils/index';
import { GUTTER_WIDTH } from '@constants/sizes';

const CONTAINER_WIDTHS = {
  XS: 100,
  SM: 540,
  MD: 720,
  LG: 960,
  XL: 1140
};

export const Container = styled.div<ContainerProps>({
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
  [style.prop('flex')]: (justifyContent: JustifyContentOptions) => ({
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
