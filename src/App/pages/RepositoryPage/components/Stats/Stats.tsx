import * as React from 'react';
import { memo } from 'react';
import StatsItem from 'pages/RepositoryPage/components/StatsItem';
import { useRepositoryPageStore } from 'store/RepositoryPageStore';
import s from './Stats.module.scss';

const Stats: React.FC = () => {
  const store = useRepositoryPageStore();
  const { repoData } = store;

  if (!repoData) {
    return null;
  }
  const { forksCount, stargazersCount, watchersCount } = repoData;

  return (
    <div className={s.statsContainer}>
      <StatsItem type={'stars'} number={stargazersCount} />
      <StatsItem type={'watchers'} number={watchersCount} />
      <StatsItem type={'forks'} number={forksCount} />
    </div>
  );
};

export default memo(Stats);
