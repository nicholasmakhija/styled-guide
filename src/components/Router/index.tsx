import React, { useState, useRef, useEffect } from 'react';

import { Navigation } from '@components/Navigation';
import { Container, Main } from '@ui';

const orUndefined = (value: string) => value || undefined;

const scrollToElement = (id?: string): void => {
  const target = id && document.querySelector(id);

  if (target) {
    target.scrollIntoView();
  } else {
    window.scrollTo(0, 0);
  }
};

export const Router = ({
  currentPage,
  pages = {}
}: AppProps) => {
  const [route, setRoute] = useState<Route>({
    hash: undefined,
    pathname: currentPage,
    canScroll: false
  });

  const mainRef = useRef<HTMLElement>();

  const updateRoute = (
    hash: string | undefined,
    pathname: string
  ) => {
    setRoute({
      hash,
      pathname,
      canScroll: true
    });
  };

  const clickHandler = (e: Event) => {
    e.preventDefault();

    const anchor = e.currentTarget as HTMLAnchorElement;
    const { pathname } = anchor;
    const hash = orUndefined(anchor.hash);

    // NOTE: below is to update URL with hash
    // const newPath = hash
    //   ? pathname + hash
    //   : pathname;

    // history.pushState(hash, '', newPath);

    history.pushState(hash, '', pathname);

    updateRoute(hash, pathname);
  };

  useEffect(() => {
    window.addEventListener('popstate', (e) => {
      const pathName = window.location.pathname;
      const newPath = Object.keys(pages).find((path) =>
        path.includes(pathName)
      );

      if (newPath) {
        const hash = orUndefined(e.state as string);

        updateRoute(hash, pathName);
      }
    });
  }, [pages]);

  useEffect(() => {
    if (route.canScroll) {
      scrollToElement(route.hash);
    }

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
  });

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
