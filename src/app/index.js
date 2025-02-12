import React, { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { App } from '@components/App';

const root = document.getElementById('root');
const content = window.content;

hydrateRoot(root, 
  <StrictMode>
    <App {...content} />
  </StrictMode>
);