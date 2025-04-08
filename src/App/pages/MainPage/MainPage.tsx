import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { useInitMainPage } from 'App/pages/MainPage/hooks';
import { Option } from 'components/Dropdown/Dropdown.types';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import { useMainPageStore } from 'store/MainPageStore/';
import List from './components/List';
import ReposPagination from './components/ReposPagination';
import ReposSearch from './components/ReposSearch';
import TypeDropdown from './components/TypesDropdown';
import s from './MainPage.module.scss';

const MainPage: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const store = useMainPageStore();

  const { isLoading, isError, reposOnCurrPage, setTypeFilter, setOrgName, fetchRepos, setCurrPage } = store;

  const handleTypeChange = useCallback(
    (e: Option) => {
      setTypeFilter(e.key);
      searchParams.set('type', e.key);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams, setTypeFilter],
  );

  const handlePageChange = useCallback(
    (n: number) => {
      setCurrPage(n);
      searchParams.set('page', `${n}`);
      setSearchParams(searchParams);
    },
    [searchParams, setCurrPage, setSearchParams],
  );

  const handleGetRepos = useCallback(
    (org: string) => {
      if (!org) {
        return;
      }
      setOrgName(org);
      searchParams.set('org', org.trim());
      setSearchParams(searchParams);

      fetchRepos();
    },
    [fetchRepos, searchParams, setOrgName, setSearchParams],
  );

  useInitMainPage();

  return (
    <PageLayout className={s.page}>
      <div className={s.content}>
        <Typography view="title" tag="h1" align="center">
          List of organization repositories
        </Typography>
        <div className={s.filters}>
          <TypeDropdown className={s.dropdown} onChange={handleTypeChange} />
          <ReposSearch onChange={handleGetRepos} />
        </div>
        {isLoading && <Loader />}
        {isError && <ErrorMsg />}
        {!isLoading && !isError && (
          <>
            <List repos={reposOnCurrPage} />
            <ReposPagination onChange={handlePageChange} className={s.pagination} />
          </>
        )}
      </div>
    </PageLayout>
  );
});

export default MainPage;
