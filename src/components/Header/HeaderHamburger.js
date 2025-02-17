import React, { useState, useEffect } from 'react';

import { useEventListener } from '@common/hooks';
import { dispatchCustomEvent } from '@common/utils';
import { NAV_ID } from '@common/constants';
import { EVENT_NAV_OPENED } from '@components/Navigation';
import { HeaderButton, Line } from './elements';

export const HeaderHamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    dispatchCustomEvent(EVENT_NAV_OPENED, isOpen);
  }, [isOpen]);

  useEventListener(EVENT_NAV_OPENED, closeHandler);

  return (
    <HeaderButton
      aria-label='Menu'
      aria-expanded={isOpen}
      aria-controls={NAV_ID}
      isToggle
      isOpen={isOpen}
      onClick={clickHandler}
    >
      <Line />
      <Line />
      <Line />
    </HeaderButton>
  );
};
