import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import ImageLoader from 'components/ImageLoader';
import Typography from 'components/Typography';
import { CardProps } from './Card.types';
import s from './Card.module.scss';

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot,
  ...props
}) => (
  <div className={c(s.card, className)} onClick={onClick} {...props}>
    <div className={s.imageContainer}>
      <ImageLoader src={image} alt={title || ''} classname={s.img} />
    </div>
    <div className={s.content}>
      <div className={s.main}>
        {captionSlot && (
          <Typography color="secondary" weight="medium" view="p-14" className={s.caption} tag="div">
            {captionSlot}
          </Typography>
        )}
        {title && (
          <Typography tag="h3" view="p-20" weight="medium" color="primary" maxLines={2}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography view="p-16" color="secondary" maxLines={3} className={s.subtitle}>
            {subtitle}
          </Typography>
        )}
      </div>
      {(contentSlot || actionSlot) && (
        <div className={s.footer}>
          {contentSlot && (
            <div className={s.contentSlot}>
              <Typography view="p-18" weight="bold" tag="div">
                {contentSlot}
              </Typography>
            </div>
          )}
          {actionSlot}
        </div>
      )}
    </div>
  </div>
);

export default memo(Card);
