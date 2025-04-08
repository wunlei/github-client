import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { memo } from 'react';
import Typography from 'components/Typography';
import { useRepositoryPageStore } from 'store/RepositoryPageStore';
import s from './Readme.module.scss';

const Readme: React.FC = observer(() => {
  const store = useRepositoryPageStore();
  const { readme } = store;
  if (!readme) {
    return null;
  }

  return (
    <div className={s.readmeContainer}>
      <Typography weight="bold" view="p-14">
        README.md
      </Typography>
      <div dangerouslySetInnerHTML={{ __html: readme }}></div>
    </div>
  );
});

export default memo(Readme);
