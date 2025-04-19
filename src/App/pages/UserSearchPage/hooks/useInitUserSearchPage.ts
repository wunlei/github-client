import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useUserSearchPageStore } from 'store/UserSearchPageStore';

export const useInitUserSearchPage = () => {
  const store = useUserSearchPageStore();
  const [searchParams] = useSearchParams();

  const { setUsername, fetchUsers } = store;
  const { setCurrPage } = store.paginationStore;

  useEffect(() => {
    const page = searchParams.get('page');

    if (page && parseInt(page)) {
      setCurrPage(parseInt(page));
    }

    const user = searchParams.get('user');

    if (user) {
      setUsername(user);
      fetchUsers();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
