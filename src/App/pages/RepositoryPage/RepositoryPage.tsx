import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { getReadme, getSingleRepo } from 'api/api';
import { Repo } from 'api/types';
import Avatar from 'components/Avatar';
import Badge from 'components/Badge';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import ChainIcon from 'components/icons/ChainIcon';
import Contributors from 'pages/RepositoryPage/components/Contributors';
import StatsItem from 'pages/RepositoryPage/components/StatsItem';
import Languages from './components/Languages/Languages';
import s from './RepositoryPage.module.scss';

const RepositoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { owner, repo } = useParams();
  const [repoData, setRepoData] = useState<Repo>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [readme, setReadme] = useState('');

  useEffect(() => {
    if (!owner || !repo) {
      navigate('/404');
      return;
    }

    getSingleRepo({ repo, owner })
      .then((data) => {
        setRepoData(data);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsLoading(false);
      });

    getReadme({ repo, owner }).then((data) => {
      if (data) {
        setReadme(data);
      }
    });
  }, [navigate, owner, repo]);

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

  if (!repoData || error) {
    return (
      <PageLayout>
        <ErrorMsg message={error?.message} />
      </PageLayout>
    );
  }

  const { forks_count, stargazers_count, watchers_count, html_url, topics } = repoData;
  const { avatar_url } = repoData.owner;

  return (
    <PageLayout>
      <article className={s.content}>
        <div className={s.header}>
          <Link to={'/'}>
            <ArrowDownIcon width={32} height={32} color="accent" className={s.arrowBack} />
          </Link>

          <Avatar src={avatar_url} alt={owner} />
          <Typography view="title">{repo}</Typography>
        </div>
        <div className={s.main}>
          <a href={html_url} className={s.link} target="_blank" rel="noreferrer">
            <ChainIcon />
            <Typography className={s.linkText} view="p-16" weight="bold">
              {repo}
            </Typography>
          </a>
          <div className={s.tags}>
            {topics.map((topic) => (
              <Badge key={topic}>{topic}</Badge>
            ))}
          </div>
          <div className={s.statsContainer}>
            <StatsItem type={'stars'} number={stargazers_count} />
            <StatsItem type={'watchers'} number={watchers_count} />
            <StatsItem type={'forks'} number={forks_count} />
          </div>
          <div className={s.contentFooter}>
            <Languages repo={repo} owner={owner} />
            <Contributors repo={repo} owner={owner} />
          </div>
        </div>
        <div className={s.readmeContainer}>
          <Typography weight="bold" view="p-14">
            README.md
          </Typography>
          <div dangerouslySetInnerHTML={{ __html: readme }}></div>
        </div>
      </article>
    </PageLayout>
  );
};

export default RepositoryPage;
