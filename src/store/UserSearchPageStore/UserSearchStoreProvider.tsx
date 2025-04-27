import { PropsWithChildren } from 'react';
import UserSearchPageStore, { UserSearchPageStoreContext } from 'store/UserSearchPageStore';
import { useLocalStoreApp } from 'store/hooks';

export const UserSearchPageStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useLocalStoreApp(() => new UserSearchPageStore());
  return <UserSearchPageStoreContext.Provider value={store}>{children}</UserSearchPageStoreContext.Provider>;
};
