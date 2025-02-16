import React from 'react';

import { LazyIcon } from '@components/LazyIcon';
import { Brand, Container } from '@common/ui';
import { HeaderThemeSwitcher } from './HeaderThemeSwitcher';
import { HeaderHamburger } from './HeaderHamburger';
import { Logo } from './Logo';
import {
  HeaderRoot,
  HeaderSticky,
  HeaderActions,
  HeaderLink
} from './elements';


export const Header = () => (
  <HeaderRoot>
    <HeaderSticky>
      <Container flex='space-between'>
        <Brand hasLogo>
          <Logo />
        </Brand>

        <HeaderActions>
          <HeaderThemeSwitcher />

          <HeaderLink
            canHover
            isRounded
            href='https://github.com/nicholasmakhija/styled-js' 
            target='_blank'
          >
            <LazyIcon src='/icons/github.svg' />
          </HeaderLink>

          <HeaderHamburger />
        </HeaderActions>
      </Container>
    </HeaderSticky>
  </HeaderRoot>
);