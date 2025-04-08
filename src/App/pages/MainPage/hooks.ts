import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { useMainPageStore } from 'store/MainPageStore';

export const useInitMainPage = () => {
  const store = useMainPageStore();
  const { setTypeFilter, setCurrPage, setOrgName, fetchRepos } = store;
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      setTypeFilter(type);
    }

    const page = searchParams.get('page');

    if (page && parseInt(page)) {
      setCurrPage(parseInt(page));
    }

    const org = searchParams.get('org');

    if (org) {
      setOrgName(org);
      fetchRepos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
