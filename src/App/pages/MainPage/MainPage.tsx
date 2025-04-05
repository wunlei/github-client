import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import Dropdown from 'components/Dropdown';
import { Option } from 'components/Dropdown/Dropdown.types';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageLayout from 'components/PageLayout';
import Pagination from 'components/Pagination';
import Search from 'components/Search';
import Typography from 'components/Typography';
import List from 'pages/MainPage/components/List';
import MainPageStore from 'store/MainPageStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import s from './MainPage.module.scss';

const MainPage: React.FC = observer(() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const store = useLocalStore(() => new MainPageStore());

  const {
    isLoading,
    isError,
    orgName,
    totalPages,
    currPageNum,
    reposOnCurrPage,
    filterOptions,
    filterSelectedOption,
    setTypeFilter,
    setOrgName,
    fetchRepos,
    setCurrPage,
  } = store;

  const handleTypeChange = useCallback(
    (e: Option) => {
      setTypeFilter(e.key);
      setSearchParams((prev) => {
        prev.set('type', e.key);
        return prev;
      });
    },
    [setSearchParams, setTypeFilter],
  );

  const handlePageChange = useCallback(
    (n: number) => {
      setCurrPage(n);

      setSearchParams((prev) => {
        prev.set('page', `${n}`);
        return prev;
      });
    },
    [setCurrPage, setSearchParams],
  );

  const handleGetRepos = useCallback(
    (org: string) => {
      if (!org) {
        return;
      }
      setOrgName(org);

      setSearchParams((prev) => {
        prev.set('org', org.trim());
        return prev;
      });

      fetchRepos();
    },
    [fetchRepos, setOrgName, setSearchParams],
  );

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
  }, [fetchRepos, searchParams, setCurrPage, setOrgName, setTypeFilter]);

  return (
    <PageLayout className={s.page}>
      <div className={s.content}>
        <Typography view="title" tag="h1" align="center">
          List of organization repositories
        </Typography>
        <div className={s.filters}>
          <Dropdown
            className={s.dropdown}
            options={filterOptions}
            value={filterSelectedOption}
            onChange={handleTypeChange}
          />
          <Search placeholder="Enter organization name" value={orgName} handleSearch={handleGetRepos} />
        </div>
        {isLoading && <Loader />}
        {isError && <ErrorMsg />}
        {!isLoading && !isError && (
          <>
            <List repos={reposOnCurrPage} />
            <Pagination count={totalPages} current={currPageNum} onChange={handlePageChange} />
          </>
        )}
      </div>
    </PageLayout>
  );
});

export default MainPage;
