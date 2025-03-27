import c from 'classnames';
import * as React from 'react';
import { TypographyProps } from './Typography.types';
import s from './Typography.module.scss';

const Typography: React.FC<TypographyProps> = ({
  className,
  view,
  tag,
  weight,
  children,
  color,
  maxLines,
  inline,
  ...props
}) => {
  const style = (maxLines ? { '--max-lines': maxLines } : {}) as React.CSSProperties;

  const Tag = tag || 'p';
  return (
    <Tag
      style={style}
      className={c(
        s.text,
        s[`view-${view}`],
        s[`weight-${weight}`],
        s[`color-${color}`],
        maxLines && s.maxLines,
        inline && s.textInline,
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Typography;
