import React, { useState, useRef, useEffect } from 'react';

import { useEventListener } from '@common/hooks';
import { dispatchCustomEvent } from '@common/utils';
import { NAV_ID } from '@common/constants';
import {
  Nav,
  NavContent,
  NavList,
  NavItem,
  NavLink
} from './elements';

export const EVENT_NAV_OPENED = 'nav:opened';

/** 
 * @param {NavigationProps} props
 * @returns {JSX.Element}
 */
export const Navigation = ({
  currentPath,
  pages = [],
  onChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  /** @type {{ current: HTMLDivElement }} */
  const navContentRef = useRef();

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

    dispatchCustomEvent(EVENT_NAV_OPENED, false);
  };

  useEventListener(EVENT_NAV_OPENED, toggleHandler);
  useEventListener('click', closeHandler);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    
    const { scrollY } = window;

    const { body } = document;
    const initialPosition = body.style.position;
    const initialTop = body.style.top;

    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;

    return () => {
      body.style.position = initialPosition;
      body.style.top = initialTop;

      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  return (
    <Nav id={NAV_ID} isOpen={isOpen}>
      <NavContent ref={navContentRef}>
        {pages.map(({ path, sections, title }, index) => (
          <NavList key={`${index}-${title}`}>
            <NavItem>
              <NavLink
                href={path}
                isTitle
                isActive={path === currentPath}
                onClick={(e) => {
                  e.preventDefault();

                  if (path !== currentPath) {
                    history.pushState(path, '', path);

                    onChange({
                      hash: undefined,
                      pathname: path
                    });
                  }

                  window.scrollTo(0, 0);
                }}
              >{title}</NavLink>
            </NavItem>
           
            {sections.map(({ id, text }) => (
              <NavItem key={id}>
                <NavLink
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();

                    if (path !== currentPath) {
                      history.pushState({}, '', path);
                    }

                    onChange({
                      hash: /** @type {HTMLAnchorElement} */(
                        e.currentTarget
                      ).hash,
                      pathname: path
                    });
                  }}
                >{text}</NavLink>
              </NavItem>
            ))}
          </NavList>
        ))}
      </NavContent>
    </Nav>
  );
};
