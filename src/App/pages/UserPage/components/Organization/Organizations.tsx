import * as React from 'react';
import { memo } from 'react';
import { Link } from 'react-router';
import Typography from 'components/Typography';
import { OrganizationsProps } from 'pages/UserPage/components/Organization/Organizations.types';
import UserStatsItem from 'pages/UserPage/components/UserStatsItem/UserStatsItem';
import s from './Organizations.module.scss';

const Organizations: React.FC<OrganizationsProps> = ({ orgs }) => {
  return (
    <UserStatsItem type="orgs">
      <div className={s.wrapper}>
        {orgs.split(', ').map((org, i, arr) => {
          const separator = i < arr.length - 1 ? ', ' : '';
          const el =
            org[0] === '@' ? (
              <Link to={`/?org=${org.slice(1)}`} className={s.link}>
                {org}
              </Link>
            ) : (
              org
            );

          return (
            <Typography weight="bold" key={org}>
              {el}
              {separator}
            </Typography>
          );
        })}
      </div>
    </UserStatsItem>
  );
};

export default memo(Organizations);
