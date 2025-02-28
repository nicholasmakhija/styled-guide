import React, { useState, useRef, useEffect } from 'react';

import { useEventListener } from '@common/hooks';
import { dispatchCustomEvent } from '@common/utils';
import { EVENTS, NAV_ID } from '@common/constants';
import { HeaderButton, Line } from './elements';

export const HeaderHamburger = () => {
  const [isOpen, setIsOpen] = useState(false);

  /** @type {{ current: HTMLButtonElement }} */
  const buttonRef = useRef();

  const clickHandler = () => {
    setIsOpen((prevState) => !prevState);
  };

  /**
   * @param {CustomEvent} e
   * @returns {void}
   */
  const closeHandler = (e) => {
    setIsOpen(false);

    if (e.detail && buttonRef.current) {
      buttonRef.current.focus();
    }
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
      ref={buttonRef}
      onClick={clickHandler}
    >
      <Line />
      <Line />
      <Line />
    </HeaderButton>
  );
};
