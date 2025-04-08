import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Pagination from 'components/Pagination';
import { useMainPageStore } from 'store/MainPageStore/';
import { ReposPaginationProps } from './ReposPagination.types';

const ReposPagination: React.FC<ReposPaginationProps> = observer(({ className, onChange }) => {
  const store = useMainPageStore();
  const { totalPages, currPageNum } = store;

  return <Pagination className={className} count={totalPages} current={currPageNum} onChange={onChange} />;
});

export default ReposPagination;
