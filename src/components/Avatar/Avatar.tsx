import c from 'classnames';
import * as React from 'react';
import { AvatarProps } from './Avatar.types';
import s from './Avatar.module.scss';

const Avatar: React.FC<AvatarProps> = ({ type = 'square', src, alt, ...props }) => {
  return (
    <div className={c(s.container, s[type])} {...props}>
      <img src={src} alt={alt} className={s.img} />
    </div>
  );
};

export default Avatar;
