type NavProps = {
  children?: React.ReactNode;
  id?: string;
  isOpen?: boolean;
};

type NavContentProps = {
  children?: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
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
  pageList: Page[];
  onClick?: (e: Event) => void;
};
