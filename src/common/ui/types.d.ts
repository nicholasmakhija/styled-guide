type JustifyContentOptions = 
  | 'start'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly';

type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
  flex?: JustifyContentOptions;
  isFluid?: boolean;
  isFullWidth?: boolean;
};

type MainProps = {
  children?: React.ReactNode;
  dangerouslySetInnerHTML?: {
    __html: string;
  };
  ref?: React.ForwardedRef<HTMLElement>;
};