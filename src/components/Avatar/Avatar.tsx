import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import ImageLoader from 'components/ImageLoader';
import { AvatarProps } from './Avatar.types';
import s from './Avatar.module.scss';

const Avatar: React.FC<AvatarProps> = ({ type = 'square', src, alt, ...props }) => {
  return (
    <div className={c(s.container, s[type])} {...props}>
      <ImageLoader src={src} alt={alt} classname={s.img} />
    </div>
  );
};

export default memo(Avatar);
