import { RepoLanguagesApi } from 'api/types';

export const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-GB', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getLangPercents = (languages: RepoLanguagesApi) => {
  const sum = Object.values(languages).reduce((acc, curr) => acc + curr, 0);

  return Object.entries(languages).map(([lang, count]) => [lang, ((count * 100) / sum).toFixed(1)]);
};

export const getRange = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export const paginateArray = <T>(array: T[], perPage: number): T[][] => {
  if (!array.length) {
    return [[]];
  }
  const pages = Math.ceil(array.length / perPage);
  return Array.from({ length: pages }, (_v, i) => array.slice(i * perPage, i * perPage + perPage));
};
