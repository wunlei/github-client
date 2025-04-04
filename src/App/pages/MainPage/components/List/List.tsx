import * as React from 'react';
import { memo } from 'react';
import { Link } from 'react-router';
import Card from 'components/Card';
import Typography from 'components/Typography';
import StarIcon from 'components/icons/StarIcon';
import { ROUTES } from 'config/router';
import { formatDate } from 'utils/utils';
import { ListProps } from './List.types';
import s from './List.module.scss';

const List: React.FC<ListProps> = ({ repos }) => {
  return (
    <div className={s.list}>
      {!repos.length && <Typography>No repositories found</Typography>}
      {repos.map((el) => (
        <Link key={el.id} to={`${ROUTES.repos}/${el.owner.login}/${el.name}`}>
          <Card
            className={s.listCard}
            image={el.owner.avatar_url}
            title={el.name}
            subtitle={el.description || ''}
            captionSlot={
              <div className={s.cardHeader}>
                <div className={s.starsContainer}>
                  <StarIcon width={14} height={14} className={s.starIcon} />
                  <span>{el.stargazers_count}</span>
                </div>
                <div>Updated on {formatDate(el.updated_at)}</div>
              </div>
            }
          ></Card>
        </Link>
      ))}
    </div>
  );
};

export default memo(List);
