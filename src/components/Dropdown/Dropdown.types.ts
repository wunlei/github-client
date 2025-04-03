export type Option = {
  key: string;
  value: string;
};

export type DropdownProps = {
  className?: string;
  options: Option[];
  value: Option;
  onChange: (value: Option) => void;
  disabled?: boolean;
  placeholder?: string;
};
