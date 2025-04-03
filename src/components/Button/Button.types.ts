export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  className?: string;
  size?: 'normal' | 'small';
  variant?: 'primary' | 'ghost';
};
