import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import { InputButtonProps } from './InputButton.types';
import s from './InputButton.module.scss';

const InputButton: React.FC<InputButtonProps> = ({ classname, children, ...props }) => {
  return (
    <span className={c(s.btn, classname)} role="button" {...props}>
      {children}
    </span>
  );
};

export default memo(InputButton);
