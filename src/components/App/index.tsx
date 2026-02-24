import React from 'react';

import { Header } from '@components/Header';
import { Router } from '@components/Router';
import { Footer } from '@components/Footer';
import { AppRoot } from './elements';

export const App = (props: AppProps) => {
  return (
    <AppRoot>
      <Header isDark={props.isDark} />
      <Router {...props} />
      <Footer />
    </AppRoot>
  );
};
