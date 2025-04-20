import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useParams } from 'react-router';
import Avatar from 'components/Avatar';
import ErrorMsg from 'components/ErrorMsg';
import Loader from 'components/Loader';
import PageHeader from 'components/PageHeader';
import PageLayout from 'components/PageLayout';
import Typography from 'components/Typography';
import ChainIcon from 'components/icons/ChainIcon';
import { useRepositoryPageStore } from 'store/RepositoryPageStore';
import Contributors from './components/Contributors';
import Languages from './components/Languages/Languages';
import Readme from './components/Readme';
import Stats from './components/Stats/Stats';
import Topics from './components/Topics/Topics';
import { useInitRepositoryPage } from './hooks';
import s from './RepositoryPage.module.scss';

const RepositoryPage: React.FC = observer(() => {
  const { owner, repo } = useParams();

  const store = useRepositoryPageStore();
  const { repoData } = store;
  const { isLoading, isError, errorMessage } = store.metaStore;

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
        <ErrorMsg message={errorMessage || ''} />
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
        <PageHeader>
          <Avatar src={avatarUrl} alt={owner} />
          <Typography view="title">{repo}</Typography>
        </PageHeader>

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
