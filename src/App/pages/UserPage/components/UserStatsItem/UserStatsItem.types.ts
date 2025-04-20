import { PropsWithChildren } from 'react';

export type UserStatsItemProps = {
  type: 'blog' | 'orgs' | 'location' | 'followers';
} & PropsWithChildren;
