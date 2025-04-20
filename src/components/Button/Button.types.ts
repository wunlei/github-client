export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  className?: string;
  size?: 'normal' | 'small' | 'icon';
  variant?: 'primary' | 'ghost';
};
