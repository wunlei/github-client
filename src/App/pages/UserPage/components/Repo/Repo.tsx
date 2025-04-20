import c from 'classnames';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import Typography from 'components/Typography';
import CalendarIcon from 'components/icons/CalendarIcon';
import ForkIcon from 'components/icons/ForkIcon';
import RepoIcon from 'components/icons/RepoIcon';
import StarIcon from 'components/icons/StarIcon';
import { RepoProps } from 'pages/UserPage/components/Repo/Repo.types';
import UserRepoStore from 'store/UserRepoStore';
import { useLocalStoreApp } from 'store/hooks/useLocalStoreApp';
import { formatDate } from 'utils';
import s from './Repo.module.scss';

const Repo: React.FC<RepoProps> = observer(({ username }) => {
  const store = useLocalStoreApp(() => new UserRepoStore());
  const { data, fetchData } = store;

  useEffect(() => {
    fetchData(username);
  }, [fetchData, username]);

  if (!data.length) {
    return null;
  }

  return (
    <div>
      <Typography className={s.title} weight="bold">
        Recently updated repositories:
      </Typography>
      <div className={s.container}>
        {data.map((repo) => {
          const { id, htmlUrl, name, description, language, stargazersCount, forksCount, updatedAt } = repo;

          return (
            <div className={s.repo} key={id}>
              <div className={s.header}>
                <RepoIcon width={16} height={16} />
                <Typography view="p-18" color="accent">
                  <a href={htmlUrl} target="_blank" rel="noreferrer">
                    {name}
                  </a>
                </Typography>
              </div>
              <Typography className={s.description} view="p-14">
                {description}
              </Typography>
              <div className={s.footer}>
                {language && (
                  <div className={s.footerEl}>
                    <span className={c(s.indicator, language)}></span>
                    {language}
                  </div>
                )}
                <div className={s.footerEl}>
                  <StarIcon width={16} height={16} />
                  {stargazersCount}
                </div>
                <div className={s.footerEl}>
                  <ForkIcon width={16} height={16} />
                  {forksCount}
                </div>
                <div className={s.footerEl}>
                  <CalendarIcon width={16} height={16} />
                  Updated on {formatDate(updatedAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Repo;

//TODO check memo/observers
