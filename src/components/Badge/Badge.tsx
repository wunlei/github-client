import * as React from 'react';
import { memo } from 'react';
import { BadgeProps } from './Badge.types';
import * as s from './Badge.module.scss';

const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <div className={s.badge} {...props}>
      {children}
    </div>
  );
};

export default memo(Badge);
