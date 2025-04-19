import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router';
import { useInitUserSearchPage } from 'App/pages/UserSearchPage/hooks';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import { useUserSearchPageStore } from 'store/UserSearchPageStore';
import List from './components/List';
import ReposPagination from './components/ReposPagination';
import ReposSearch from './components/ReposSearch';
import s from './UserSearchPage.module.scss';

const UserSearchPage: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const store = useUserSearchPageStore();

  const { currPageItems } = store.paginationStore;
  const { isLoading, isError, isSuccess, isInitial, errorMessage } = store.metaStore;

  const handlePageChange = useCallback(
    (n: number) => {
      searchParams.set('page', `${n}`);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  const handleUserChange = useCallback(
    (username: string) => {
      searchParams.set('user', username);
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams],
  );

  useInitUserSearchPage();

  const showList = isSuccess && !isInitial;

  return (
    <PageLayout className={s.page}>
      <div className={s.content}>
        <Typography view="title" tag="h1" align="center">
          List of users
        </Typography>
        <div className={s.filters}>
          <ReposSearch onChange={handleUserChange} />
        </div>
        {isLoading && <Loader className={s.loader} />}
        {isError && <ErrorMsg message={errorMessage || ''} />}
        {showList && (
          <>
            <List users={currPageItems} />
            <ReposPagination onChange={handlePageChange} className={s.pagination} />
          </>
        )}
      </div>
    </PageLayout>
  );
});

export default UserSearchPage;
