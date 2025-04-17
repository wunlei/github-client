import * as React from 'react';
import { memo } from 'react';
import { Link } from 'react-router';
import Card from 'components/Card';
import ErrorMsg from 'components/ErrorMsg';
import StarIcon from 'components/icons/StarIcon';
import { routes } from 'config/router';
import { formatDate } from 'utils';
import { ListProps } from './List.types';
import s from './List.module.scss';

const List: React.FC<ListProps> = ({ repos }) => {
  return (
    <div className={s.list}>
      {repos.length === 0 && <ErrorMsg classname={s.errorMsg} message="This organization has no public repositories" />}
      {repos.map((el) => (
        <Link key={el.id} to={routes.repos.create(el.owner.login, el.name)}>
          <Card
            className={s.listCard}
            image={el.owner.avatarUrl}
            title={el.name}
            subtitle={el.description || ''}
            captionSlot={
              <div className={s.cardHeader}>
                <div className={s.starsContainer}>
                  <StarIcon width={14} height={14} className={s.starIcon} />
                  <span>{el.stargazersCount}</span>
                </div>
                <div>Updated on {formatDate(el.updatedAt)}</div>
              </div>
            }
          ></Card>
        </Link>
      ))}
    </div>
  );
};

export default memo(List);
