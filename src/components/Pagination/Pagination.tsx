import c from 'classnames';
import * as React from 'react';
import { memo, useState } from 'react';
import Typography from 'components/Typography';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { getRange } from 'utils/utils';
import { PaginationProps } from './Pagination.types';
import * as s from './Pagination.module.scss';

const Pagination: React.FC<PaginationProps> = ({ count = 3, offset = 3, current, onChange }) => {
  const firstPage = 1;

  const [currPage, setCurrPage] = useState(current || firstPage);

  const handleChangeCurrPage = (n: number) => {
    if (currPage === n) {
      return;
    }
    setCurrPage(n);
    if (onChange) {
      onChange(n);
    }
  };

  const siblingCount = Math.floor((offset - 2) / 2);

  const siblingsStart = Math.max(Math.min(currPage - siblingCount, count - offset), firstPage + 1);

  const siblingsEnd = Math.min(Math.max(currPage + siblingCount, firstPage + offset), count - 1);

  const startPages = siblingsStart > firstPage + 1 ? [firstPage, '…'] : [firstPage];

  const endPages: Array<string | number> = getRange(Math.max(count, firstPage + 1), count);

  if (siblingsEnd < count - 1) {
    endPages.unshift('…');
  }

  const itemList = [...startPages, ...getRange(siblingsStart, siblingsEnd), ...endPages];

  if (count === 0) {
    return null;
  }

  return (
    <div className={s.container}>
      <button
        className={c(s.item, s.btn)}
        disabled={currPage === firstPage}
        onClick={() => handleChangeCurrPage(currPage - 1)}
      >
        <ArrowDownIcon className={s.arrowBtnLeft} />
      </button>
      {itemList.map((e, i) => {
        if (typeof e === 'string') {
          return (
            <button key={e + i} className={c(s.btn, s.btnMore)}>
              <Typography view="p-18" className={s.item}>
                …
              </Typography>
            </button>
          );
        }
        return (
          <button className={c(s.btn, e === currPage && s.btnActive)} key={e} onClick={() => handleChangeCurrPage(e)}>
            <Typography view="p-18" className={s.item}>
              {e}
            </Typography>
          </button>
        );
      })}

      <button
        className={c(s.item, s.btn)}
        disabled={currPage === count}
        onClick={() => handleChangeCurrPage(currPage + 1)}
      >
        <ArrowDownIcon className={s.arrowBtnRight} />
      </button>
    </div>
  );
};

export default memo(Pagination);
