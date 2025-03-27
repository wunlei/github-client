import * as React from 'react';
import { BadgeProps } from './Badge.types';
import s from './Badge.module.scss';

const Badge: React.FC<BadgeProps> = ({ children, ...props }) => {
  return (
    <div className={s.badge} {...props}>
      {children}
    </div>
  );
};

export default Badge;
