import { PropsWithChildren } from 'react';
import MainPageStore, { MainPageStoreContext } from 'store/MainPageStore';
import { useLocalStoreApp } from 'store/hooks';

export const MainPageStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useLocalStoreApp(() => new MainPageStore());
  return <MainPageStoreContext.Provider value={store}>{children}</MainPageStoreContext.Provider>;
};
