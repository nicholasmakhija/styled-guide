import styled from '@styled';

import { asRem, breakpoints } from '@utils';
import {
  CONTENT_SPACER,
  GUTTER_WIDTH,
  NAV_WIDTH
} from '@constants';

export const Main = styled.main<MainProps>({
  flex: 1,
  paddingTop: asRem(CONTENT_SPACER),
  paddingRight: asRem(GUTTER_WIDTH),
  paddingLeft: asRem(GUTTER_WIDTH),
  maxWidth: '100%',
  [breakpoints.up.lg]: {
    marginLeft: asRem(NAV_WIDTH),
    maxWidth: `calc(100% - ${asRem(NAV_WIDTH)})`
  }
}).withRef();
