import React from 'react';

import { LazyIcon } from '@components/LazyIcon';
import { Container } from '@common/ui';
import { HeaderThemeSwitcher } from './HeaderThemeSwitcher';
import { HeaderHamburger } from './HeaderHamburger';
import { Logo } from './Logo';
import {
  HeaderRoot,
  HeaderSticky,
  HeaderBrand,
  HeaderActions,
  HeaderLink
} from './elements';


export const Header = () => (
  <HeaderRoot>
    <HeaderSticky>
      <Container flex='space-between'>
        <HeaderBrand>
          <Logo />
        </HeaderBrand>

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