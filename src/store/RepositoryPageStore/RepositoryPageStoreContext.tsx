import { createContext, PropsWithChildren, useContext } from 'react';
import RepositoryPageStore from 'store/RepositoryPageStore';
import { useLocalStore } from 'store/hooks/useLocalStore';

export const RepositoryPageStoreContext = createContext<RepositoryPageStore | null>(null);

export const useRepositoryPageStore = (): RepositoryPageStore => {
  const context = useContext(RepositoryPageStoreContext);

  if (!context) {
    throw new Error('useRepositoryPageStore must be used within <RepositoryPageStoreProvider>');
  }

  return context;
};

export const RepositoryPageStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useLocalStore(() => new RepositoryPageStore());
  return <RepositoryPageStoreContext.Provider value={store}>{children}</RepositoryPageStoreContext.Provider>;
};
