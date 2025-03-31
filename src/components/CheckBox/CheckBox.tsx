import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import CheckIcon from '../icons/CheckIcon';
import { CheckBoxProps } from './Checkbox.types';
import s from './Checkbox.module.scss';

const CheckBox: React.FC<CheckBoxProps> = ({ checked, disabled, className, onChange, ...props }) => (
  <label className={c(s.checkbox, disabled && s.checkbox_disabled, className)}>
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      className={s.input}
      onChange={(e) => onChange(e.target.checked)}
      {...props}
    />
    <CheckIcon color="accent" className={s.checkIcon} width={40} height={40} />
  </label>
);

export default memo(CheckBox);
