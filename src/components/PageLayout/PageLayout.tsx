import c from 'classnames';
import * as React from 'react';
import Header from 'components/Header';
import { PageLayoutProps } from './PageLayout.types';
import s from './PageLayout.module.scss';

const PageLayout: React.FC<PageLayoutProps> = ({ className, children, ...props }) => {
  return (
    <>
      <Header />
      <main className={c(s.main, className)} {...props}>
        {children}
      </main>
    </>
  );
};

export default PageLayout;
