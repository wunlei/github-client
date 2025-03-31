import * as React from 'react';
import { memo } from 'react';
import Typography from 'components/Typography';
import ForkIcon from 'components/icons/ForkIcon';
import StarIcon from 'components/icons/StarIcon';
import WatchIcon from 'components/icons/WatchIcon';
import { StatsItemProps } from './StatsItem.types';
import s from './StatsItem.module.scss';

const Items = {
  stars: { icon: <StarIcon />, text: 'stars' },
  watchers: { icon: <WatchIcon />, text: 'watching' },
  forks: { icon: <ForkIcon />, text: 'forks' },
};

const StatsItem: React.FC<StatsItemProps> = ({ number, type }) => {
  return (
    <div className={s.statsItem}>
      {Items[type].icon}
      <Typography view="p-14">
        <strong>{number}</strong> {Items[type].text}
      </Typography>
    </div>
  );
};

export default memo(StatsItem);
