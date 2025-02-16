import React from 'react';

import { Brand, Container } from '@common/ui';
import { FooterRoot, FooterHighlight } from './elements';

export const Footer = () => (
  <FooterRoot>
    <Container>
      <Brand>
        Built using <FooterHighlight>Styled</FooterHighlight>.
      </Brand>
    </Container>
  </FooterRoot>
);