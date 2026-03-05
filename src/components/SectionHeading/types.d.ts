type SectionHeadingTextProps = {
  children?: React.ReactNode;
  id?: string;
};

type SectionHeadingProps = Omit<Section, 'content'>;

type SectionHeadingTooltipProps = {
  children?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'aria-hidden'?: boolean;
};

type SectionHeadingButtonProps = {
  children?: React.ReactNode;
  'aria-label'?: string;
  onClick?: () => void;
};
