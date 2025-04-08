import { createContext, PropsWithChildren, useContext } from 'react';
import MainPageStore from 'store/MainPageStore/MainPageStore';
import { useLocalStore } from 'store/hooks/useLocalStore';

export const MainPageStoreContext = createContext<MainPageStore | null>(null);

export const useMainPageStore = (): MainPageStore => {
  const context = useContext(MainPageStoreContext);

  if (!context) {
    throw new Error('useMainPageStore must be used within <MainPageStoreProvider>');
  }

  return context;
};

export const MainPageStoreProvider = ({ children }: PropsWithChildren) => {
  const store = useLocalStore(() => new MainPageStore());
  return <MainPageStoreContext.Provider value={store}>{children}</MainPageStoreContext.Provider>;
};
