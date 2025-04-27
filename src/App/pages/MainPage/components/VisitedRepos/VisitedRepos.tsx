import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect } from 'react';
import List from 'App/pages/MainPage/components/List';
import Typography from 'components/Typography';
import { useMainPageStore } from 'store/MainPageStore/';
import s from './VisitedRepos.module.scss';

const VisitedRepos: React.FC = observer(() => {
  const store = useMainPageStore();

  const { isInitial } = store.metaStore;
  const { data, repos, fetchRepos } = store.visitedReposStore;

  useEffect(() => {
    if (data.length > 0) {
      fetchRepos();
    }
  }, [data.length, fetchRepos]);

  const showVisited = isInitial && repos.length > 0;

  if (!showVisited) {
    return null;
  }

  return (
    <>
      <Typography weight="bold" view="p-20" className={s.subtitle}>
        Recently viewed repos:
      </Typography>
      <List repos={repos} />
    </>
  );
});

export default VisitedRepos;
