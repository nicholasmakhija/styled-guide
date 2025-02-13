import React, { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { App } from '@components/App';

const root = document.getElementById('root');
const data = window.data;

hydrateRoot(root, 
  <StrictMode>
    <App {...data} />
  </StrictMode>
);