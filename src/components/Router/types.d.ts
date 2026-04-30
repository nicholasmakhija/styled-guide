type RouterProps = Pick<AppProps, 'currentPage' | 'pages'>;

type Route = {
  hash: string | undefined;
  pathname: string;
  canScroll: boolean;
};
