import styled, { style } from '@styled';

import { asRem, breakpoints } from '@common/utils';
import { CSS_VARS, GUTTER_WIDTH, NAV_WIDTH } from '@common/constants';

/** @type {import('@styled').StyledComponent<BrandProps>} */
export const Brand = styled.div({
  padding: `${asRem(4)} 0`,
  [breakpoints.up.lg]: {
    // background: 'rgba(255, 204, 0, 0.4)', // FIXME: delete!
    marginLeft: asRem(-GUTTER_WIDTH),
    paddingRight: asRem(24),
    paddingLeft: asRem(24),
    width: asRem(NAV_WIDTH),
    textAlign: 'right'
  },
  [style.prop('hasLogo')]: {
    color: CSS_VARS.ACCENT,
    [style.selector('> svg')]: {
      // background: '#ccc', // FIXME: delete!
      verticalAlign: 'middle'
    }
  }
});