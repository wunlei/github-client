import { PropsWithChildren } from 'react';

export type SkeletonProps = {
  width: number;
  height: number;
  classname?: string;
} & PropsWithChildren;
