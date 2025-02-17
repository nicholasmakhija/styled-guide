type HeaderActionProps = {
  'aria-label'?: string;
  children?: React.ReactNode;
  canHover?: boolean;
  isRounded?: boolean;
};

type HeaderLinkProps = HeaderActionProps & {
  href: string;
  target?: string;
  rel?: string;
};

type HeaderButtonProps = HeaderActionProps & {
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  isToggle?: boolean;
  isOpen?: boolean;
  onClick?: (e: Event) => void;
};
