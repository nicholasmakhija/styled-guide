import React from 'react';

import { Header } from '@components/Header';
import { Router } from '@components/Router';
import { Footer } from '@components/Footer';
import { AppRoot } from './elements';

/** 
 * @param {AppProps} props
 * @returns {JSX.Element}
 */
export const App = (props) => {
  return (
    <AppRoot>
      <Header isDark={props.isDark} />
      <Router {...props} />
      <Footer />
    </AppRoot>
  );
};
