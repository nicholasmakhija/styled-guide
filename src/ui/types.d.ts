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
  ref?: React.ForwardedRef<HTMLElement | undefined>;
};

type RichTextProps = {
  dangerouslySetInnerHTML?: {
    __html: string;
  };
};

type BoxShadow = {
  boxShadow: string;
};

type Color = {
  color: string;
};

type CodeBlockColours =
  | 'blue'
  | 'green'
  | 'grey'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'white'
  | 'yellow';
