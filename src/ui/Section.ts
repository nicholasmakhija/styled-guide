import styled from '@styled';

import { contentParadigm } from '@utils';
import {
  CHILD_PARADIGM,
  CONTENT_SPACER
} from '@constants';

export const Section = styled.section({
  ...contentParadigm(CONTENT_SPACER * 2),
  ...CHILD_PARADIGM
});
