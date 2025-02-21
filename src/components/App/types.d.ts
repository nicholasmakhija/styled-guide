type Section = {
  id: string;
  text: string;
};

type Page = {
  content: string;
  path: string;
  title: string;
  sections: Section[];
};

type AppProps = Partial<IsDarkProp> & {
  currentPage: string;
  pages: Record<string, Page>;
};

// NOTE: keep below in sync with `common/constants/globals`
declare var __APP_DATA: AppProps;

