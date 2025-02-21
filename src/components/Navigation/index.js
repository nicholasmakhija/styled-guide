import React, { useState, useRef } from 'react';

import { useEventListener } from '@common/hooks';
import { dispatchCustomEvent } from '@common/utils';
import {
  BREAKPOINTS,
  EVENTS,
  KEYS,
  NAV_ID
} from '@common/constants';
import {
  Nav,
  NavContent,
  NavList,
  NavItem,
  NavLink
} from './elements';

/** 
 * @param {NavigationProps} props
 * @returns {JSX.Element}
 */
export const Navigation = ({
  currentPath,
  pageList = [],
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  /** @type {{ current: HTMLDivElement }} */
  const navContentRef = useRef();

  /**
   * @param {string} pathname 
   * @returns {(e: Event) => void}
   */
  const clickHandler = (pathname) => (e) => {
    e.preventDefault();

    if (pathname !== currentPath) {
      history.pushState({}, '', pathname);
    }

    const { hash } = /** @type {HTMLAnchorElement} */(
      e.currentTarget
    );

    onChange({
      hash,
      pathname
    });

    if (!hash) {
      window.scrollTo(0, 0);
    }
  };

  /**
   * @param {CustomEvent} e 
   * @returns {void}
   */
  const toggleHandler = (e) => {
    const newState = e.detail;

    setIsOpen(newState);
  };

  /**
   * @param {Event} e 
   * @returns {void}
   */
  const closeHandler = (e) => {
    if (!isOpen) {
      return;
    }

    const element = navContentRef.current;
    const target = /** @type {Node} */(e.target);

    if (element && !element.contains(target)) {
      setIsOpen(false);
    }

    dispatchCustomEvent(EVENTS.NAV_CLOSED, false);
  };

  /**
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  const keydownHandler = (e) => {
    if (window.innerWidth >= BREAKPOINTS.LG) {
      return;
    }

    if (e.key === KEYS.ESC && isOpen) {
      setIsOpen(false);

      dispatchCustomEvent(EVENTS.NAV_CLOSED, true);
    }

    if (e.key === KEYS.TAB) {
      const anchors = /** @type {HTMLElement[]} */([
        ...navContentRef
          .current
          .querySelectorAll('a')
      ]);
      const firstElement = anchors[0];
      const lastElement = anchors[anchors.length - 1];
      const { activeElement } = document;
  
      if (e.shiftKey) {
        if (activeElement === firstElement) {
          lastElement.focus();
  
          e.preventDefault();
        }
      } else if (activeElement === lastElement) {
        firstElement.focus();
  
        e.preventDefault();
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
                onClick={clickHandler(path)}
              >{title}</NavLink>
            </NavItem>
           
            {sections.map(({ id, text }) => (
              <NavItem key={id}>
                <NavLink
                  href={`#${id}`}
                  onClick={clickHandler(path)}
                >{text}</NavLink>
              </NavItem>
            ))}
          </NavList>
        ))}
      </NavContent>
    </Nav>
  );
};
