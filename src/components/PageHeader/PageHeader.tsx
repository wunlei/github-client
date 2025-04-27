import c from 'classnames';
import * as React from 'react';
import { memo, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Button from 'components/Button';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { routes } from 'config/router';
import { PageHeaderProps } from './PageHeader.types';
import s from './PageHeader.module.scss';

const PageHeader: React.FC<PageHeaderProps> = ({ className, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateBack = useCallback(() => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate(routes.home);
    }
  }, [location.key, navigate]);

  return (
    <div className={c(s.header, className)}>
      <Button size="icon" variant="ghost" onClick={handleNavigateBack}>
        <ArrowDownIcon width={32} height={32} color="accent" className={s.arrowBack} />
      </Button>
      <div className={s.headerDetails}>{children}</div>
    </div>
  );
};

export default memo(PageHeader);
