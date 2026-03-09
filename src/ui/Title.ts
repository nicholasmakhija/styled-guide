import styled from '@styled';

import { contentParadigm } from '@utils';
import { CONTENT_SPACER, TYPOGRAPHY } from '@constants';

export const Title = styled.h1({
  ...TYPOGRAPHY.H1,
  ...contentParadigm(CONTENT_SPACER)
});
