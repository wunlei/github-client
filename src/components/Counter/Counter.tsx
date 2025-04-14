import * as React from 'react';
import { memo } from 'react';
import { CounterProps } from './Counter.types.ts';
import * as s from './Counter.module.scss';

const Counter: React.FC<CounterProps> = ({ children, ...props }) => {
  return (
    <div className={s.counter} {...props}>
      {children}
    </div>
  );
};

export default memo(Counter);
