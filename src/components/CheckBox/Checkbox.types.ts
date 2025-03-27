export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  className?: string;
  onChange: (checked: boolean) => void;
};
