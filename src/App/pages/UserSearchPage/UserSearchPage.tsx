import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router';
import { useInitUserSearchPage } from 'App/pages/UserSearchPage/hooks';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import { useUserSearchPageStore } from 'store/UserSearchPageStore';
import List from './components/List';
import UsersPagination from './components/UsersPagination';
import UsersSearch from './components/UsersSearch';
import s from './UserSearchPage.module.scss';

const UserSearchPage: React.FC = observer(() => {
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const store = useUserSearchPageStore();

  const { reset } = store;
  const { currPageItems } = store.paginationStore;
  const { isLoading, isError, isSuccess, isInitial, errorMessage } = store.metaStore;
  const { data: visitedUsers } = store.visitedUsersStore;

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

  useInitUserSearchPage();

  const showVisited = isInitial && visitedUsers.length > 0;
  const showList = isSuccess && !isInitial;

  return (
    <PageLayout className={s.page}>
      <div className={s.content}>
        <Typography view="title" tag="h1" align="center">
          List of users
        </Typography>
        <div className={s.filters}>
          <UsersSearch onChange={handleUserChange} />
        </div>
        {isLoading && <Loader className={s.loader} />}
        {isError && <ErrorMsg message={errorMessage || ''} />}
        {showVisited && (
          <>
            <Typography weight="bold" view="p-20" className={s.subtitle}>
              Recently viewed users:
            </Typography>
            <List users={visitedUsers} />
          </>
        )}
        {showList && (
          <>
            <List users={currPageItems} />
            <UsersPagination onChange={handlePageChange} className={s.pagination} />
          </>
        )}
      </div>
    </PageLayout>
  );
});

export default UserSearchPage;
