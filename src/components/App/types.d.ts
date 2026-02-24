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

type PageManifest = Record<string, Page>;

type AppProps = IsDarkProp & {
  currentPage: string;
  pages: PageManifest;
};

// NOTE: keep below in sync with `constants/globals`
// eslint-disable-next-line no-var
declare var __APP_DATA: AppProps;
