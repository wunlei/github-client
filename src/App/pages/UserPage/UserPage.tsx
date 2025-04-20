import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import { routes } from 'config/router';
import Repo from 'pages/UserPage/components/Repo/Repo';
import UserStats from 'pages/UserPage/components/UserStats/UserStats';
import { useInitUserPage } from 'pages/UserPage/hooks';
import { useUserPageStore } from 'store/UserPageStore';
import s from './UserPage.module.scss';

const UserPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { username } = useParams();

  const store = useUserPageStore();
  const { data } = store;
  const { isLoading, isError } = store.metaStore;

  const handleNavigateBack = useCallback(() => {
    if (routerLocation.key !== 'default') {
      navigate(-1);
    } else {
      navigate(routes.home);
    }
  }, [routerLocation.key, navigate]);

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
        <ErrorMsg />
      </PageLayout>
    );
  }

  if (!data) {
    return null;
  }

  const { avatarUrl, login, name, blog, company, followers, following, location, htmlUrl } = data;

  return (
    <PageLayout>
      <div className={s.content}>
        <div className={s.header}>
          <Button size="icon" variant="ghost" onClick={handleNavigateBack}>
            <ArrowDownIcon width={32} height={32} color="accent" className={s.arrowBack} />
          </Button>
          <Avatar src={avatarUrl} alt={login} />
          <div className={s.headerName}>
            <Typography tag="h1" weight="bold">
              {name}
            </Typography>
            <Typography view="p-20">{login}</Typography>
          </div>
        </div>
        <div className={s.main}>
          <UserStats
            followers={followers}
            following={following}
            blog={blog}
            company={company}
            location={location}
            link={htmlUrl}
          />
        </div>
        <Repo username={username} />
      </div>
    </PageLayout>
  );
});

export default UserPage;
