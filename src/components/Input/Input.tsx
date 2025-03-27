import c from 'classnames';
import { forwardRef } from 'react';
import { InputProps } from 'components/Input/Input.types';
import s from './Input.module.scss';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ value, afterSlot, className, disabled, onChange, ...props }, ref) => (
    <label className={c(s.label, disabled && s.disabled, className)}>
      <input
        ref={ref}
        type="text"
        value={value}
        disabled={disabled}
        className={s.input}
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
      {afterSlot}
    </label>
  ),
);

Input.displayName = 'Input';

export default Input;
