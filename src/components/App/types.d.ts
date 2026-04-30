type Section = {
  id: string;
  title: string;
  content: string;
};

type Page = {
  title: string;
  sections: Section[];
};

type PageManifest = Record<string, Page>;

type AppProps = Prettify<IsDarkProp & {
  currentPage: string;
  pages: PageManifest;
}>;

// NOTE: keep below in sync with `constants/globals`
// eslint-disable-next-line no-var
declare var __APP_DATA: AppProps;
