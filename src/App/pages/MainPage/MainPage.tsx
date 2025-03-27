import * as React from 'react';
import PageLayout from 'components/PageLayout';
import s from './MainPage.module.scss';

const MainPage: React.FC = () => {
  return <PageLayout className={s.page}>Main page</PageLayout>;
};

export default MainPage;
