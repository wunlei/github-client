import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import { IconProps } from './Icon.types';
import s from './Icon.module.scss';

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  color,
  width = 24,
  height = 24,
  className,
  children,
  ...props
}) => (
  <svg
    className={c(s.icon, s[`color-${color}`], className)}
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    {children}
  </svg>
);

export default memo(Icon);
