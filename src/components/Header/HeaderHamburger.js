import React, { useState, useEffect } from 'react';

import { useEventListener } from '@common/hooks';
import { dispatchCustomEvent } from '@common/utils';
import { EVENTS, NAV_ID } from '@common/constants';
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
    dispatchCustomEvent(EVENTS.NAV_TOGGLED, isOpen);
  }, [isOpen]);

  useEventListener(EVENTS.NAV_CLOSED, closeHandler);

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
