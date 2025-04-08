import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import Avatar from 'components/Avatar';
import Badge from 'components/Badge';
import Button from 'components/Button';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import ChainIcon from 'components/icons/ChainIcon';
import { topicUrl } from 'config/api';
import { routes } from 'config/router';
import Contributors from 'pages/RepositoryPage/components/Contributors';
import StatsItem from 'pages/RepositoryPage/components/StatsItem';
import { RepositoryPageStore } from 'store/RepositoryPageStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import Languages from './components/Languages/Languages';
import s from './RepositoryPage.module.scss';

const RepositoryPage: React.FC = observer(() => {
  const navigate = useNavigate();
  const location = useLocation();
  const { owner, repo } = useParams();

  const store = useLocalStore(() => new RepositoryPageStore());

  const { isLoading, isError, readme, repoData, fetchReadme, fetchRepo, setOrgName, setRepoName } = store;

  const handleNavigateBack = useCallback(() => {
    if (location.key !== 'default') {
      navigate(-1);
    } else {
      navigate(routes.home);
    }
  }, [location.key, navigate]);

  useEffect(() => {
    if (!owner || !repo) {
      navigate(routes.notFound);
      return;
    }

    setOrgName(owner);
    setRepoName(repo);

    fetchRepo();
    fetchReadme();
  }, [fetchReadme, fetchRepo, navigate, owner, repo, setOrgName, setRepoName]);

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

  const { forksCount, stargazersCount, watchersCount, htmlUrl, topics } = repoData;
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
          {!!topics.length && (
            <div className={s.tags}>
              {topics.map((topic) => (
                <Badge key={topic}>
                  <a href={`${topicUrl}${topic}`} target="_blank" rel="noreferrer">
                    {topic}
                  </a>
                </Badge>
              ))}
            </div>
          )}
          <div className={s.statsContainer}>
            <StatsItem type={'stars'} number={stargazersCount} />
            <StatsItem type={'watchers'} number={watchersCount} />
            <StatsItem type={'forks'} number={forksCount} />
          </div>
          <div className={s.contentFooter}>
            <Languages owner={owner} repo={repo} />
            <Contributors owner={owner} repo={repo} />
          </div>
        </div>
        {readme && (
          <div className={s.readmeContainer}>
            <Typography weight="bold" view="p-14">
              README.md
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: readme }}></div>
          </div>
        )}
      </article>
    </PageLayout>
  );
});

export default RepositoryPage;
