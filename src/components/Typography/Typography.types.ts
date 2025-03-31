import { PropsWithChildren } from 'react';

export type TypographyProps = {
  className?: string;
  view?: 'title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  color?: 'primary' | 'secondary' | 'accent';
  maxLines?: number;
  inline?: boolean;
  align?: 'start' | 'end' | 'center' | 'justify';
} & PropsWithChildren;
