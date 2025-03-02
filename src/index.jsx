import React, { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { App } from '@components/App';
import { getResource } from '@common/utils';
import { APP_DATA } from '@common/constants';

getResource('/json/pages.json', 'application/json; charset=utf-8')
  .then(((response) => response.json()))
  .then((response) => {
    const props = {
      ...window[APP_DATA],
      pages: response.pages
    };

    const root = document.getElementById('root');
  
    hydrateRoot(root, 
      <StrictMode>
        <App {...props} />
      </StrictMode>
    );
  });

