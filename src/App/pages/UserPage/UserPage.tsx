import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useParams } from 'react-router';
import Avatar from 'components/Avatar';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageHeader from 'components/PageHeader';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import Repo from 'pages/UserPage/components/Repo/Repo';
import UserStats from 'pages/UserPage/components/UserStats/UserStats';
import { useInitUserPage } from 'pages/UserPage/hooks';
import { useUserPageStore } from 'store/UserPageStore';
import s from './UserPage.module.scss';

const UserPage: React.FC = observer(() => {
  const { username } = useParams();

  const store = useUserPageStore();
  const { data } = store;
  const { isLoading, isError, errorMessage } = store.metaStore;

  useInitUserPage();

  if (!username) {
    return null;
  }

  if (isLoading) {
    return (
      <PageLayout>
        <div className={s.loaderContainer}>
          <Loader />
        </div>
      </PageLayout>
    );
  }

  if (isError) {
    return (
      <PageLayout>
        <ErrorMsg message={errorMessage || ''} />
      </PageLayout>
    );
  }

  if (!data) {
    return null;
  }

  const { avatarUrl, login, name } = data;

  return (
    <PageLayout>
      <div className={s.content}>
        <PageHeader>
          <Avatar src={avatarUrl} alt={login} />
          <div className={s.headerName}>
            <Typography view="title">{name}</Typography>
            <Typography view="p-20">{login}</Typography>
          </div>
        </PageHeader>
        <div className={s.main}>
          <UserStats {...data} />
        </div>
        <Repo username={username} />
      </div>
    </PageLayout>
  );
});

export default UserPage;
