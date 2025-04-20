import { PropsWithChildren } from 'react';
import UserPageStore, { UserPageStoreContext } from 'store/UserPageStore';
import { useLocalStoreApp } from 'store/hooks';

export const UserPageStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useLocalStoreApp(() => new UserPageStore());
  return <UserPageStoreContext.Provider value={store}>{children}</UserPageStoreContext.Provider>;
};
