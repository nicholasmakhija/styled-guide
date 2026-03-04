import styled from '@styled';

import { contentParadigm, typography } from '@utils';
import { CONTENT_SPACER } from '@constants';

export const Title = styled.h1({
  ...contentParadigm(CONTENT_SPACER),
  ...typography(32, 40)
});
