import { RepoApi } from 'api/types';
import { normalizeOwner, OwnerModel } from 'store/models/api/owner';

export type RepoModel = {
  id: number;
  name: string;
  owner: OwnerModel;
  htmlUrl: string;
  description?: string;
  updatedAt: Date;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  topics: string[];
};

export const normalizeRepo = (from: RepoApi): RepoModel => {
  const { owner, updated_at, stargazers_count, watchers_count, forks_count, html_url } = from;

  return {
    ...from,
    owner: normalizeOwner(owner),
    updatedAt: new Date(updated_at),
    htmlUrl: html_url,
    stargazersCount: stargazers_count,
    watchersCount: watchers_count,
    forksCount: forks_count,
  };
};
