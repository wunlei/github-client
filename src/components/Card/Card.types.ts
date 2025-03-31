export type CardProps = {
  className?: string;
  image: string;
  captionSlot?: React.ReactNode;
  title: string;
  subtitle: string;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
};
