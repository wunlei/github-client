import * as React from 'react';
import { useEffect, useState } from 'react';
import { getRepoContributors } from 'api/api';
import { User } from 'api/types';
import Avatar from 'components/Avatar';
import Counter from 'components/Counter';
import Typography from 'components/Typography';
import { ContributorsProps } from './Contributors.types';
import * as s from './Contributors.module.scss';

const Contributors: React.FC<ContributorsProps> = ({ repo, owner }) => {
  const [data, setData] = useState<User[]>();

  useEffect(() => {
    const result = getRepoContributors({ repo, owner });

    result.then((data) => {
      if (data) {
        setData(data.filter((el) => !!el));
      }
    });
  }, [owner, repo]);

  if (!data || !data.length) {
    return null;
  }

  return (
    <div className={s.contributors}>
      <div>
        <Typography weight="bold" view="p-18" tag="span">
          Contributors
        </Typography>
        <Counter>{data.length}</Counter>
      </div>
      <div>
        <ul className={s.contributorList}>
          {data.map((el) => (
            <li key={el.login} className={s.contributor}>
              <Avatar type="round" src={el.avatar_url} alt={el.login} />
              <Typography view="p-16" weight="bold" tag="span">
                {el.login}
              </Typography>
              <Typography view="p-16" color="secondary" tag="span">
                {el.name}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contributors;
