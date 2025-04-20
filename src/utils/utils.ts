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
  const result: string[][] = [];

  Object.entries(languages).forEach(([lang, count]) => {
    const percentage = (count * 100) / sum;
    if (percentage > 1) {
      result.push([lang, percentage.toFixed(1)]);
    }
  });

  return result;
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

export const formatNumber = (n: number) => {
  return new Intl.NumberFormat('en', { notation: 'compact' }).format(n);
};
