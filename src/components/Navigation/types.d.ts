type NavProps = {
  children?: React.ReactNode;
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
  pages: Page[];
  onChange: (arg: Route) => void;
};
