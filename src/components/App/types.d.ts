type Sections = {
  id: string;
  text: string;
};

type Page = {
  content: string;
  path: string;
  title: string;
  sections: Sections[];
};

type AppProps = {
  currentPage?: string;
  pages?: Page[]
};