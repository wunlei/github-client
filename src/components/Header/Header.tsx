import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import { Link } from 'react-router';
import Typography from 'components/Typography';
import LogoIcon from 'components/icons/LogoIcon';
import { routes } from 'config/router';
import { HeaderProps } from './Header.types';
import s from './Header.module.scss';

const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
  return (
    <header className={c(s.header, className)} {...props}>
      <div className={s.content}>
        <Link to={routes.home}>
          <div className={s.logoContainer}>
            <LogoIcon />
            <Typography view="p-20" weight="bold">
              GitHub Client
            </Typography>
          </div>
        </Link>
      </div>
    </header>
  );
};

export default memo(Header);
