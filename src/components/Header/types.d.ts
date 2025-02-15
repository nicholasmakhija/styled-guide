type HeaderActionProps = {
  children?: React.ReactNode;
  canHover?: boolean;
  isRounded?: boolean;
};

type HeaderLinkProps = HeaderActionProps & {
  href: string;
  target?: string;
};

type HeaderButtonProps = HeaderActionProps & {
  isToggle?: boolean;
  isOpen?: boolean;
  onClick?: (e: Event) => void;
};
