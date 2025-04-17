import { createContext, useContext } from 'react';
import RepositoryPageStore from 'store/RepositoryPageStore';

export const RepositoryPageStoreContext = createContext<RepositoryPageStore | null>(null);

export const useRepositoryPageStore = (): RepositoryPageStore => {
  const context = useContext(RepositoryPageStoreContext);

  if (!context) {
    throw new Error('useRepositoryPageStore must be used within <RepositoryPageStoreProvider>');
  }

  return context;
};
