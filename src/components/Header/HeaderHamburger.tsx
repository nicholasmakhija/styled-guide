import React, { useState, useRef, useEffect } from 'react';

import { useEventListener, dispatchCustomEvent } from '@utils';
import { EVENTS, NAV_ID } from '@constants';
import { HeaderButton, Line } from './elements';

export const HeaderHamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>();

  const clickHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  const closeHandler = (event: CustomEvent<boolean>) => {
    setIsOpen(false);

    if (event.detail && buttonRef.current) {
      buttonRef.current.focus();
    }
  };

  useEffect(() => {
    dispatchCustomEvent(EVENTS.NAV_TOGGLED, isOpen);
  }, [isOpen]);

  useEventListener(EVENTS.NAV_CLOSED, closeHandler);

  return (
    <HeaderButton
      aria-label="Menu"
      aria-expanded={isOpen}
      aria-controls={NAV_ID}
      isToggle
      isOpen={isOpen}
      ref={buttonRef}
      onClick={clickHandler}
    >
      <Line />
      <Line />
      <Line />
    </HeaderButton>
  );
};
