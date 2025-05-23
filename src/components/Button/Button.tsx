import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import Loader from 'components/Loader';
import { ButtonProps } from './Button.types';
import s from './Button.module.scss';

const Button: React.FC<ButtonProps> = ({
  loading,
  disabled,
  variant = 'primary',
  size = 'normal',
  className,
  children,
  ...props
}) => {
  return (
    <button
      disabled={loading || disabled}
      className={c(s.btn, disabled && s.btnDisabled, s[variant], s[`size-${size}`], className)}
      {...props}
    >
      {loading && <Loader size="s" className={s.loader} />}
      {children}
    </button>
  );
};

export default memo(Button);
