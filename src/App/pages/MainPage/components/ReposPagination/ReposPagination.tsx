import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Pagination from 'components/Pagination';
import { useMainPageStore } from 'store/MainPageStore/';
import { ReposPaginationProps } from './ReposPagination.types';

const ReposPagination: React.FC<ReposPaginationProps> = observer(({ className, onChange }) => {
  const store = useMainPageStore();
  const { totalPages, currPageNum, setCurrPage } = store;

  const handlePageChange = (n: number) => {
    setCurrPage(n);
    onChange(n);
  };

  return <Pagination className={className} count={totalPages} current={currPageNum} onChange={handlePageChange} />;
});

export default ReposPagination;
