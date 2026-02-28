import React, { useState, useRef, useEffect } from 'react';

import { Navigation } from '@components/Navigation';
import { Container, Main } from '@ui';
import {
  CONTENT_SPACER,
  HEADER_HEIGHT,
  NAV_LINK_PADDING
} from '@constants';

const offset = HEADER_HEIGHT + CONTENT_SPACER + NAV_LINK_PADDING;

const orUndefined = (value: string) => value || undefined;

const scrollToElement = (id?: string): void => {
  const target = id && document.querySelector(id);
  const y = target
    ? target.getBoundingClientRect().top + window.scrollY - offset
    : 0;

  window.scrollTo(0, y);
};

export const Router = ({
  currentPage,
  pages = {}
}: AppProps) => {
  const [route, setRoute] = useState<Route>({
    hash: undefined,
    pathname: currentPage
  });

  const mainRef = useRef<HTMLElement>();

  const clickHandler = (e: Event) => {
    e.preventDefault();

    const anchor = e.currentTarget as HTMLAnchorElement;
    const { pathname } = anchor;
    const hash = orUndefined(anchor.hash);

    history.pushState(hash, '', pathname);

    setRoute({
      hash,
      pathname
    });
  };

  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      const pathName = window.location.pathname;
      const newPath = Object.keys(pages).find((path) =>
        path.includes(pathName)
      );

      if (newPath) {
        setRoute({
          hash: orUndefined(e.state as string),
          pathname: newPath
        });
      }
    });
  }, [pages]);

  useEffect(() => {
    scrollToElement(route.hash);

    const mainElement = mainRef.current;

    if (!mainElement) {
      return;
    }

    mainElement
      .querySelectorAll('pre > code, [data-table] > div')
      .forEach((element) => element.setAttribute('tabindex', '-1'));

    const anchors: NodeListOf<HTMLAnchorElement> =
      mainElement.querySelectorAll('a:not([target])');

    anchors.forEach((a) => a.onclick = clickHandler);

    return () => {
      anchors.forEach((a) => a.removeAttribute('onclick'));
    };
  }, [route]);

  return (
    <Container isFluid flex="start">
      <Navigation
        currentPath={route.pathname}
        pageList={Object.values(pages)}
        onClick={clickHandler}
      />

      <Main
        ref={mainRef}
        dangerouslySetInnerHTML={{
          __html: pages[route.pathname].content
        }}
      />
    </Container>
  );
};
