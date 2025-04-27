import { createContext, useContext } from 'react';
import UserPageStore from 'store/UserPageStore';

export const UserPageStoreContext = createContext<UserPageStore | null>(null);

export const useUserPageStore = (): UserPageStore => {
  const context = useContext(UserPageStoreContext);

  if (!context) {
    throw new Error('useUserPageStore must be used within <UserPageStoreProvider>');
  }

  return context;
};
