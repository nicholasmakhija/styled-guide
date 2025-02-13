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

type AppProps = {
  currentPage?: string;
  pages?: Page[]
};

declare var data: AppProps;