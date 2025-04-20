import * as React from 'react';
import { memo } from 'react';
import Organizations from 'App/pages/UserPage/components/Organization/Organizations';
import { UserStatsProps } from 'App/pages/UserPage/components/UserStats/UserStats.types';
import UserStatsItem from 'App/pages/UserPage/components/UserStatsItem/UserStatsItem';
import Typography from 'components/Typography';
import { formatNumber } from 'utils';
import s from './UserStats.module.scss';

const UserStats: React.FC<UserStatsProps> = ({ followers, following, company, blog, location, link }) => {
  return (
    <div className={s.container}>
      {link && (
        <a target="_blank" rel="noreferrer" href={link}>
          <UserStatsItem type="link">
            <Typography className={s.userLink} weight="bold">
              {link}
            </Typography>
          </UserStatsItem>
        </a>
      )}
      <UserStatsItem type="followers">
        <Typography view="p-14">
          <Typography weight="bold" inline tag="span">
            {formatNumber(followers)}
          </Typography>{' '}
          followers
        </Typography>
        <Typography weight="bold" inline tag="span">
          {' · '}
        </Typography>{' '}
        <Typography view="p-14">
          <Typography weight="bold" inline tag="span">
            {formatNumber(following)}
          </Typography>{' '}
          following
        </Typography>
      </UserStatsItem>

      {company && <Organizations orgs={company} />}

      {blog && (
        <UserStatsItem type="link">
          {' '}
          <Typography>
            <a target="_blank" rel="noreferrer" href={blog} className={s.link}>
              {blog}
            </a>
          </Typography>
        </UserStatsItem>
      )}

      {location && (
        <UserStatsItem type="location">
          <Typography>{location}</Typography>
        </UserStatsItem>
      )}
    </div>
  );
};

export default memo(UserStats);
