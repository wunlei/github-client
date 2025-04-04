import { observer } from 'mobx-react-lite';
import * as React from 'react';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import Counter from 'components/Counter';
import Typography from 'components/Typography';
import ContributorsStore from 'store/ContributorsStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import { ContributorsProps } from './Contributors.types';
import s from './Contributors.module.scss';

const Contributors: React.FC<ContributorsProps> = observer(({ owner, repo }) => {
  const store = useLocalStore(() => new ContributorsStore());

  const { fetchData, hasHiddenItems, isAllVisible, toggleVisible, visibleItems, data } = store;

  const handleVisibleChange = () => {
    toggleVisible();
  };

  React.useEffect(() => {
    fetchData({ owner, repo });
  }, [fetchData, owner, repo]);

  if (!data || !data.length) {
    return null;
  }

  return (
    <div className={s.contributors}>
      <div>
        <Typography weight="bold" view="p-18" tag="span">
          Contributors
        </Typography>
        <Counter>{data.length}</Counter>
      </div>
      <div>
        <ul className={s.contributorList}>
          {visibleItems.map((el) => (
            <li key={el.login}>
              <a href={el.htmlUrl} className={s.contributor} target="_blank" rel="noreferrer">
                <Avatar type="round" src={el.avatarUrl} alt={el.login} />
                <Typography view="p-16" weight="bold" tag="span">
                  {el.login}
                </Typography>
                <Typography view="p-16" color="secondary" tag="span">
                  {el.name}
                </Typography>
              </a>
            </li>
          ))}
        </ul>
        {hasHiddenItems && (
          <Button variant="ghost" size="small" onClick={handleVisibleChange} className={s.btnShowMore}>
            <Typography view="p-16" tag="span">
              {isAllVisible ? 'Show less' : 'Show more'}
            </Typography>
          </Button>
        )}
      </div>
    </div>
  );
});

export default Contributors;
