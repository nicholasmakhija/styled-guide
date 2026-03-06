import styled from '@styled';

import { asRem } from '@utils/as-rem';
import {
  CHILD_PARADIGM,
  CONTENT_SPACER
} from '@constants';

export const Section = styled.section({
  margin: `0 0 ${asRem(CONTENT_SPACER * 2)}`,
  ...CHILD_PARADIGM
});
