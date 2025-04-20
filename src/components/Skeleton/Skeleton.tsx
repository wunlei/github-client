import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import { SkeletonProps } from './Skeleton.types';
import s from './Skeleton.module.scss';

const Skeleton: React.FC<SkeletonProps> = ({ width, height, classname, children, ...props }) => {
  return (
    <div style={{ width: `${width}px`, height: `${height}px` }} className={c(s.container, classname)} {...props}>
      {children}
    </div>
  );
};

export default memo(Skeleton);
