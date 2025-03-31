import { RepoLanguages } from 'api/types';

export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  return date.toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getLangPercents = (languages: RepoLanguages) => {
  const sum = Object.values(languages).reduce((acc, curr) => acc + curr, 0);

  return Object.entries(languages).map(([lang, count]) => [lang, ((count * 100) / sum).toFixed(1)]);
};

export const getRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};
