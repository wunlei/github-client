import { RepoApi } from 'api/types';

export type RepoModelLS = {
  owner: string;
  repo: string;
};

export const normalizeRepoLS = ({ owner, name }: RepoApi): RepoModelLS => ({
  owner: owner.login,
  repo: name,
});
