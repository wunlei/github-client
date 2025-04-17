import { createContext, useContext } from 'react';
import MainPageStore from 'store/MainPageStore';

export const MainPageStoreContext = createContext<MainPageStore | null>(null);

export const useMainPageStore = (): MainPageStore => {
  const context = useContext(MainPageStoreContext);

  if (!context) {
    throw new Error('useMainPageStore must be used within <MainPageStoreProvider>');
  }

  return context;
};
