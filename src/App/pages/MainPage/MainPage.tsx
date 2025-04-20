import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { Option } from 'components/Dropdown/Dropdown.types';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import { useInitMainPage } from 'pages/MainPage/hooks';
import { useMainPageStore } from 'store/MainPageStore/';
import List from './components/List';
import ReposPagination from './components/ReposPagination';
import ReposSearch from './components/ReposSearch';
import TypeDropdown from './components/TypesDropdown';
import s from './MainPage.module.scss';

const MainPage: React.FC = observer(() => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const store = useMainPageStore();

  const { reset } = store;

  const { currPageItems } = store.paginationStore;
  const { isLoading, isError, isSuccess, isInitial, errorMessage } = store.metaStore;
  const { data: visitedRepos } = store.visitedReposStore;

  const handleTypeChange = useCallback(
    (option: Option) => {
      searchParams.set('type', option.key);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const handlePageChange = useCallback(
    (n: number) => {
      searchParams.set('page', `${n}`);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const handleOrgChange = useCallback(
    (org: string) => {
      searchParams.set('org', org.trim());
      if (searchParams.get('page')) {
        searchParams.set('page', '1');
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    if (location.search == '' && location.key !== 'default') {
      reset();
    }
  }, [reset, location.search, location.key]);

  useInitMainPage();

  const showVisited = isInitial && visitedRepos.length > 0;
  const showRepos = isSuccess && !isInitial;

  return (
    <PageLayout className={s.page}>
      <div className={s.content}>
        <Typography view="title" tag="h1" align="center">
          List of organization repositories
        </Typography>
        <div className={s.filters}>
          <TypeDropdown className={s.dropdown} onChange={handleTypeChange} />
          <ReposSearch onChange={handleOrgChange} />
        </div>
        {isLoading && <Loader className={s.loader} />}
        {isError && <ErrorMsg message={errorMessage || ''} />}
        {showVisited && (
          <>
            <Typography weight="bold" view="p-20" className={s.subtitle}>
              Recently viewed repos:
            </Typography>
            <List repos={visitedRepos} />
          </>
        )}
        {showRepos && (
          <>
            <List repos={currPageItems} />
            <ReposPagination onChange={handlePageChange} className={s.pagination} />
          </>
        )}
      </div>
    </PageLayout>
  );
});

export default MainPage;
