type SectionHeadingTextProps = {
  children?: React.ReactNode;
  id?: string;
};

type SectionHeadingProps = Omit<Section, 'content'>;

type SectionHeadingTooltipProps = {
  children?: React.ReactNode;
  isVisible?: boolean;
};

type SectionHeadingButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};
