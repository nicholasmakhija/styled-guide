import React, {
  useState,
  useRef
} from 'react';

import { useEventListener } from '@common/hooks';
import { dispatchCustomEvent } from '@common/utils';
import {
  Nav,
  NavContent,
  NavList,
  NavItem,
  NavLink
} from './elements';

export const EVENT_NAV_OPENED = 'nav:opened';

/** 
 * @param {AppProps & {
 *  onChange: (arg: Route) => void
 * }} props
 * @returns {JSX.Element}
 */
export const Navigation = ({
  currentPage,
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

  return (
    <Nav isOpen={isOpen}>
      <NavContent ref={navContentRef}>
        {pages.map(({ path, sections, title }, index) => (
          <NavList key={`${index}-${title}`}>
            <NavItem>
              <NavLink
                href={path}
                isTitle
                isActive={path === currentPage}
                onClick={(e) => {
                  e.preventDefault();

                  if (path !== currentPage) {
                    history.pushState(path, '', path);

                    onChange({
                      hash: undefined,
                      pathname: path
                    });
                  }
                }}
              >{title}</NavLink>
            </NavItem>

            {/*  FIXME: {sections.map(({ id, text }) => path === currentPage && ( */} 
            {sections.map(({ id, text }) => (
              <NavItem key={id}>
                <NavLink
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();

                    if (path !== currentPage) {
                      history.pushState(path, '', path);
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
