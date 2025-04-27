import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Pagination from 'components/Pagination';
import { useUserSearchPageStore } from 'store/UserSearchPageStore';
import { UsersPaginationProps } from './UsersPagination.types';

const UsersPagination: React.FC<UsersPaginationProps> = observer(({ className, onChange }) => {
  const store = useUserSearchPageStore();
  const { totalPages, currPageNum, setCurrPage } = store.paginationStore;

  const handlePageChange = (n: number) => {
    setCurrPage(n);
    onChange(n);
  };

  return <Pagination className={className} count={totalPages} current={currPageNum} onChange={handlePageChange} />;
});

export default UsersPagination;
