import c from 'classnames';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { memo, useEffect } from 'react';
import Typography from 'components/Typography';
import LanguagesStore from 'store/LanguagesStore';
import { useLocalStore } from 'store/hooks/useLocalStore';
import { LanguagesProps } from './Languages.types';
import s from './Languages.module.scss';

const Languages: React.FC<LanguagesProps> = observer(({ owner, repo }) => {
  const store = useLocalStore(() => new LanguagesStore());

  const { dataFormatted, fetchData } = store;

  useEffect(() => {
    fetchData({ owner, repo });
  }, [fetchData, owner, repo]);

  if (!dataFormatted.length) {
    return null;
  }

  return (
    <div className={s.languages}>
      <Typography weight="bold" view="p-18">
        Languages
      </Typography>
      <div className={s.percentageBar}>
        {dataFormatted.map(([lang, percent]) => (
          <div key={lang} style={{ width: `${percent}%` }} className={c(s.percentageBarItem, lang)}></div>
        ))}
      </div>
      <ul className={s.langList}>
        {dataFormatted.map(([lang, percent]) => (
          <li key={lang} className={c(s.langItem, lang)}>
            <span className={s.indicator}></span>
            <span>
              <Typography view="p-14" inline>
                {lang}
              </Typography>{' '}
              <Typography view="p-14" color="secondary" inline>
                {percent}%
              </Typography>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default memo(Languages);
