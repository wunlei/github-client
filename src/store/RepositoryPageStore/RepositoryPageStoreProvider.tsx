import { PropsWithChildren } from 'react';
import RepositoryPageStore, { RepositoryPageStoreContext } from 'store/RepositoryPageStore';
import { useLocalStoreApp } from 'store/hooks';

export const RepositoryPageStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useLocalStoreApp(() => new RepositoryPageStore());

  return <RepositoryPageStoreContext.Provider value={store}>{children}</RepositoryPageStoreContext.Provider>;
};
