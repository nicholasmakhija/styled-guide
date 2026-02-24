import React, { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import { App } from '@components/App';
import { getResource } from '@utils/get-resource';
import { APP_DATA } from '@constants/globals';

getResource('/assets/data/pages.json', 'application/json; charset=utf-8')
  .then((response) => response.json() as Promise<PageManifest>)
  .then((response) => {
    const props = {
      ...window[APP_DATA],
      pages: response
    };

    const root = document.getElementById('root') as HTMLElement;

    hydrateRoot(root,
      <StrictMode>
        <App {...props} />
      </StrictMode>
    );
  });

