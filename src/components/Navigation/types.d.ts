type NavProps = {
  children?: React.ReactNode;
  id?: string;
  isOpen?: boolean;
};

type NavContentProps = {
  children?: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement | undefined>;
};

type NavLinkProps = {
  children?: React.ReactNode;
  href: string;
  target?: string;
  isActive?: boolean;
  isTitle?: boolean;
  onClick?: (e: Event) => void;
};

type NavigationProps = {
  currentPath: string;
  pageList: [string, Page][];
  onClick?: (e: Event) => void;
};
