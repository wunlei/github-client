import * as React from 'react';
import { memo } from 'react';
import Button from 'components/Button';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { PaginationProps } from './Pagination.types';
import * as s from './Pagination.module.scss';

const Pagination: React.FC<PaginationProps> = ({ currPage, isLastPage, onChange }) => {
  const handlePageChange = (n: number) => {
    onChange(currPage + n);
  };

  return (
    <div className={s.pagination}>
      <Button disabled={currPage === 1} onClick={() => handlePageChange(-1)}>
        <ArrowDownIcon className={s.arrowLeft} />
        Previous
      </Button>
      <Button disabled={isLastPage} onClick={() => handlePageChange(1)}>
        Next
        <ArrowDownIcon className={s.arrowRight} />
      </Button>
    </div>
  );
};

export default memo(Pagination);
