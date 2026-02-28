import React, { useState, useRef } from 'react';

import { useEventListener, dispatchCustomEvent } from '@utils';
import {
  BREAKPOINTS,
  EVENTS,
  KEYS,
  NAV_ID
} from '@constants';
import {
  Nav,
  NavContent,
  NavList,
  NavItem,
  NavLink
} from './elements';

export const Navigation = ({
  currentPath,
  pageList = [],
  onClick
}: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navContentRef = useRef<HTMLDivElement>();

  const toggleHandler = (event: CustomEvent<boolean>) => {
    const newState = event.detail;

    setIsOpen(newState);
  };

  const closeHandler = (event: Event) => {
    if (!isOpen) {
      return;
    }

    const element = navContentRef.current;
    const target = event.target as Node;

    if (element && !element.contains(target)) {
      setIsOpen(false);
    }

    dispatchCustomEvent(EVENTS.NAV_CLOSED, false);
  };

  const keydownHandler = (event: KeyboardEvent) => {
    if (window.innerWidth >= BREAKPOINTS.LG || !navContentRef.current) {
      return;
    }

    if (event.key === KEYS.ESC && isOpen) {
      setIsOpen(false);

      dispatchCustomEvent(EVENTS.NAV_CLOSED, true);
    }

    if (event.key === KEYS.TAB) {
      const anchors = [
        ...navContentRef.current.querySelectorAll('a')
      ];
      const firstElement = anchors[0];
      const lastElement = anchors[anchors.length - 1];
      const { activeElement } = document;

      if (event.shiftKey) {
        if (activeElement === firstElement) {
          lastElement.focus();

          event.preventDefault();
        }
      } else if (activeElement === lastElement) {
        firstElement.focus();

        event.preventDefault();
      }
    }
  };

  useEventListener(EVENTS.NAV_TOGGLED, toggleHandler);
  useEventListener('click', closeHandler);
  useEventListener('keydown', keydownHandler);

  return (
    <Nav id={NAV_ID} isOpen={isOpen}>
      <NavContent ref={navContentRef}>
        {pageList.map(({ path, sections, title }, index) => (
          <NavList key={`${index}-${title}`}>
            <NavItem>
              <NavLink
                href={path}
                isTitle
                isActive={path === currentPath}
                onClick={onClick}
              >{title}</NavLink>
            </NavItem>

            {sections.map(({ id, text }) => (
              <NavItem key={id}>
                <NavLink
                  href={`${path}#${id}`}
                  onClick={onClick}
                >{text}</NavLink>
              </NavItem>
            ))}
          </NavList>
        ))}
      </NavContent>
    </Nav>
  );
};
