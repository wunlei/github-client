import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import Readme from 'App/pages/RepositoryPage/components/Readme/Readme';
import Stats from 'App/pages/RepositoryPage/components/Stats/Stats';
import Topics from 'App/pages/RepositoryPage/components/Topics/Topics';
import { useInitRepositoryPage } from 'App/pages/RepositoryPage/hooks';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import ChainIcon from 'components/icons/ChainIcon';
import { routes } from 'config/router';
import Contributors from 'pages/RepositoryPage/components/Contributors';
import { useRepositoryPageStore } from 'store/RepositoryPageStore';
import Languages from './components/Languages/Languages';
import s from './RepositoryPage.module.scss';

const RepositoryPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { owner, repo } = useParams();

  const store = useRepositoryPageStore();

  const { isLoading, isError, repoData } = store;

  const handleNavigateBack = useCallback(() => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate(routes.home);
    }
  }, [location.key, navigate]);

  useInitRepositoryPage();

  if (!owner || !repo) {
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

  if (!repoData) {
    return null;
  }

  const { htmlUrl } = repoData;
  const { avatarUrl } = repoData.owner;

  return (
    <PageLayout>
      <article className={s.content}>
        <div className={s.header}>
          <Button size="small" variant="ghost" onClick={handleNavigateBack}>
            <ArrowDownIcon width={32} height={32} color="accent" className={s.arrowBack} />
          </Button>
          <Avatar src={avatarUrl} alt={owner} />
          <Typography view="title">{repo}</Typography>
        </div>
        <div className={s.main}>
          <a href={htmlUrl} className={s.link} target="_blank" rel="noreferrer">
            <ChainIcon />
            <Typography className={s.linkText} view="p-16" weight="bold">
              {repo}
            </Typography>
          </a>
          <Topics />
          <Stats />
          <div className={s.contentFooter}>
            <Languages owner={owner} repo={repo} />
            <Contributors owner={owner} repo={repo} />
          </div>
        </div>
        <Readme />
      </article>
    </PageLayout>
  );
});

export default RepositoryPage;
