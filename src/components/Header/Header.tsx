import c from 'classnames';
import * as React from 'react';
import { memo } from 'react';
import { NavLink } from 'react-router';
import Typography from 'components/Typography';
import LogoIcon from 'components/icons/LogoIcon';
import { appNav } from 'config/appNav';
import { routes } from 'config/router';
import { HeaderProps } from './Header.types';
import s from './Header.module.scss';

const Header: React.FC<HeaderProps> = ({ className, ...props }) => {
  return (
    <header className={c(s.header, className)} {...props}>
      <div className={s.content}>
        <NavLink to={routes.home}>
          <div className={s.logoContainer}>
            <LogoIcon />
            <Typography view="p-20" weight="bold">
              GitHub Client
            </Typography>
          </div>
        </NavLink>
        <div className={s.links}>
          {appNav.map((el) => (
            <NavLink key={el.url} to={el.url} className={({ isActive }) => c(s.link, isActive && s.linkActive)}>
              {el.text}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
