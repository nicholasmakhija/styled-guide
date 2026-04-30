type HeaderActionProps = {
  children?: React.ReactNode;
  'aria-label'?: string;
  canHover?: boolean;
  isRounded?: boolean;
};

type HeaderLinkProps = Prettify<HeaderActionProps & {
  children?: React.ReactNode;
  href: string;
  target?: string;
  rel?: string;
}>;

type HeaderButtonProps = Prettify<HeaderActionProps & {
  children?: React.ReactNode;
  'aria-expanded'?: boolean;
  'aria-controls'?: string;
  isToggle?: boolean;
  isOpen?: boolean;
  onClick?: (e: Event) => void;
  ref?: React.ForwardedRef<HTMLButtonElement | undefined>;
}>;

type IsDarkProp = {
  isDark: boolean;
};
