import * as React from 'react';
import { memo } from 'react';
import Badge from 'components/Badge';
import { topicUrl } from 'config/api';
import { useRepositoryPageStore } from 'store/RepositoryPageStore';
import s from './Topics.module.scss';

const Topics: React.FC = () => {
  const store = useRepositoryPageStore();
  const { repoData } = store;

  if (!repoData) {
    return null;
  }

  const { topics } = repoData;

  if (topics.length === 0) {
    return null;
  }

  return (
    <div className={s.topics}>
      {topics.map((topic) => (
        <Badge key={topic}>
          <a href={`${topicUrl}${topic}`} target="_blank" rel="noreferrer">
            {topic}
          </a>
        </Badge>
      ))}
    </div>
  );
};

export default memo(Topics);
