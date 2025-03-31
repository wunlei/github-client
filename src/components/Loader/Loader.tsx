import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import SpinnerIcon from '../icons/SpinnerIcon';
import { LoaderProps } from './Loader.types';
import s from './Loader.module.scss';

const Loader: React.FC<LoaderProps> = ({ size, className, ...props }) => {
  return (
    <div className={c(s.container, s[`container-size-${size}`], className)} {...props}>
      <SpinnerIcon color="accent" className={c(s.loader, s[`icon-size-${size}`])} />
    </div>
  );
};

export default memo(Loader);
