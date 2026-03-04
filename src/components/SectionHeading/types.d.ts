type SectionHeadingTextProps = {
  children?: React.ReactNode;
  id: string;
};

type SectionHeadingProps = Omit<Section, 'content'>;

type SectionHeadingButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
};
