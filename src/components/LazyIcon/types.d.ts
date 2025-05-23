type IconProps = {
  children?: React.ReactNode;
  className?: string;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
  focusable?: string;
  height?: number;
  role?: string;
  tabIndex?: string;
  viewBox?: string;
  width?: number;
  xmlns?: string;
};

type IconState = {
  viewBox: string;
  innerHTML: string;
};

type LazyIconProps = {
  className?: string;
  height?: number;
  src: string;
  width?: number;
};
