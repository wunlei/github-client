import { PropsWithChildren } from 'react';

export type UserStatsItemProps = {
  type: 'link' | 'orgs' | 'location' | 'followers';
} & PropsWithChildren;
