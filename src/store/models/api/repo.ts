import { RepoApi } from 'api/types';
import { normalizeOwner, OwnerModel } from 'store/models/api/owner';

export type RepoModel = {
  id: number;
  name: string;
  private: boolean;
  owner: OwnerModel;
  htmlUrl: string;
  description?: string;
  updatedAt: Date;
  stargazersCount: number;
  watchersCount: number;
  forksCount: number;
  topics: string[];
};

export const normalizeRepo = (from: RepoApi): RepoModel => ({
  id: from.id,
  name: from.name,
  private: from.private,
  owner: normalizeOwner(from.owner),
  htmlUrl: from.html_url,
  description: from.description,
  updatedAt: new Date(from.updated_at),
  stargazersCount: from.stargazers_count,
  watchersCount: from.watchers_count,
  forksCount: from.forks_count,
  topics: from.topics,
});
