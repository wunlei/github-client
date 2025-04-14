import * as React from 'react';
import { Link } from 'react-router';
import Button from 'components/Button';
import { routes } from 'config/router';
import * as s from './NotFound.module.scss';

const NotFoundPage: React.FC = () => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>404</h2>
      <p className={s.text}>Page Not Found</p>
      <Link to={routes.home} className={s.link}>
        <Button>Go to homepage</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
