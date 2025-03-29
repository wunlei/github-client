import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Pagination from 'App/pages/MainPage/components/Pagination';
import { getReposByOrg } from 'api/api';
import { Repos } from 'api/types';
import Button from 'components/Button';
import ErrorMsg from 'components/ErrorMsg';
import Input from 'components/Input';
import Loader from 'components/Loader';
import MultiDropdown from 'components/MultiDropdown';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import SearchIcon from 'components/icons/SearchIcon';
import List from 'pages/MainPage/components/List';
import s from './MainPage.module.scss';

const org = 'ktsstudio';

const MainPage: React.FC = () => {
  const per_page = 9;
  const [repos, setRepos] = useState<Repos>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);

  const handlePageChange = useCallback((n: number) => {
    setCurrPage(n);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getReposByOrg({ org, per_page, page: currPage })
      .then((repos) => setRepos(repos || []))
      .catch((error) => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, [currPage]);

  return (
    <PageLayout className={s.page}>
      <div className={s.content}>
        <Typography view="title" tag="h1" className={s.title}>
          List of organization repositories
        </Typography>
        <div className={s.filters}>
          <MultiDropdown className={s.dropdown} options={[]} value={[]} onChange={() => {}} getTitle={() => 'Type'} />
          <div className={s.inputWrapper}>
            <Input placeholder="Enter organization name" className={s.input} value={org} onChange={() => {}} />
            <Button>
              <SearchIcon className={s.btnIcon} />
            </Button>
          </div>
        </div>
        {isLoading && <Loader />}
        {error && <ErrorMsg message={error.message} />}
        {!isLoading && !error && (
          <>
            <List repos={repos}></List>
            <Pagination isLastPage={repos.length < per_page} currPage={currPage} onChange={handlePageChange} />
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default MainPage;
