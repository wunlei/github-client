import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
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
  const [searchParams, setSearchParams] = useSearchParams();
  const store = useMainPageStore();

  const { currPageItems } = store.paginationStore;
  const { isLoading, isError, isInitial } = store.metaStore;

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

  const handleGetRepos = useCallback(
    (org: string) => {
      searchParams.set('org', org.trim());
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
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
        {isLoading && <Loader className={s.loader} />}
        {isError && <ErrorMsg />}
        {!isLoading && !isError && !isInitial && (
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
