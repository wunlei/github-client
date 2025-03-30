import c from 'classnames';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { getRepoLanguages } from 'api/api';
import { RepoLanguages } from 'api/types';
import Typography from 'components/Typography';
import { getLangPercents } from 'utils/utils';
import { LanguagesProps } from './Languages.types';
import s from './Languages.module.scss';

const Languages: React.FC<LanguagesProps> = ({ repo, owner }) => {
  const [data, setData] = useState<RepoLanguages>();

  useEffect(() => {
    const result = getRepoLanguages({ repo, owner });
    result.then((data) => setData(data));
  }, [owner, repo]);

  if (!data) {
    return null;
  }

  const langArray = getLangPercents(data);

  return (
    <div className={s.languages}>
      <Typography weight="bold" view="p-18">
        Languages
      </Typography>
      <div className={s.percentageBar}>
        {langArray.map(([lang, percent]) => (
          <div key={lang} style={{ width: `${percent}%` }} className={c(s.percentageBarItem, lang)}></div>
        ))}
      </div>
      <ul className={s.langList}>
        {langArray.map(([lang, percent]) => (
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
};

export default Languages;
