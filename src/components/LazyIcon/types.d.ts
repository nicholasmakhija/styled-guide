type SkeletonSvgProps = {
  cursor?: string;
  fill?: string;
  height?: number;
  stroke?: string;
  width?: number;
  hasLoader?: boolean;
  [key: string]: unknown;
};

type IconState = {
  viewBox: string;
  innerHTML: string;
};

type LazyIconProps = {
  className?: string;
  cursor?: string;
  fill?: string;
  height?: number;
  src: string;
  stroke?: string;
  width?: number;
};
