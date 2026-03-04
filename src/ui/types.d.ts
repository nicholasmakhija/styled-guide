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

type SectionGroupProps = {
  dangerouslySetInnerHTML?: {
    __html: string;
  };
};

type Typography = {
  fontSize: string;
  lineHeight: string;
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
