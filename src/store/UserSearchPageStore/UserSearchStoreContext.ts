import { createContext, useContext } from 'react';
import UserSearchPageStore from 'store/UserSearchPageStore';

export const UserSearchPageStoreContext = createContext<UserSearchPageStore | null>(null);

export const useUserSearchPageStore = (): UserSearchPageStore => {
  const context = useContext(UserSearchPageStoreContext);

  if (!context) {
    throw new Error('useUserSearchPageStore must be used within <UserSearchPageStoreProvider>');
  }

  return context;
};
