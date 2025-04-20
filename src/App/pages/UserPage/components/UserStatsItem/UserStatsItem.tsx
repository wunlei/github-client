import * as React from 'react';
import { memo } from 'react';
import ChainIcon from 'components/icons/ChainIcon';
import LocationIcon from 'components/icons/LocationIcon';
import OrganizationIcon from 'components/icons/OrganizationIcon';
import PeopleIcon from 'components/icons/PeopleIcon';
import { UserStatsItemProps } from './UserStatsItem.types';
import s from './UserStatsItem.module.scss';

const Items = {
  blog: { icon: <ChainIcon width={24} height={24} /> },
  orgs: { icon: <OrganizationIcon /> },
  location: { icon: <LocationIcon /> },
  followers: { icon: <PeopleIcon /> },
};

const UserStatsItem: React.FC<UserStatsItemProps> = ({ type, children }) => {
  return (
    <div className={s.statsItem}>
      {Items[type].icon}
      {children}
    </div>
  );
};

export default memo(UserStatsItem);
