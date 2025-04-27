import * as React from 'react';
import { memo } from 'react';
import { Link } from 'react-router';
import Card from 'components/Card';
import ErrorMsg from 'components/ErrorMsg';
import { routes } from 'config/router';
import { ListProps } from './List.types';
import s from './List.module.scss';

const List: React.FC<ListProps> = ({ users }) => {
  return (
    <div className={s.list}>
      {users.length === 0 && <ErrorMsg classname={s.errorMsg} message="No users found" />}
      {users.map((el) => (
        <Link key={el.id} to={routes.user.create(el.login)}>
          <Card className={s.listCard} image={el.avatarUrl} title={el.login}></Card>
        </Link>
      ))}
    </div>
  );
};

export default memo(List);
