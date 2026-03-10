import styled from '@styled';

import { GenericParadigm } from './Generics';
import { asRem } from '@utils/as-rem';
import { CONTENT_SPACER } from '@constants';

export const Section = styled
  .section()
  .extend(GenericParadigm, {
    margin: `0 0 ${asRem(CONTENT_SPACER * 2)}`
  });
