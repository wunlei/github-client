import { UserApi } from 'api/types';

export type UserModel = {
  login: string;
  id: number;
  avatarUrl: string;
  htmlUrl: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  followers: number;
  following: number;
  publicRepos: number;
};

export const normalizeUser = ({ avatar_url, html_url, public_repos, ...rest }: UserApi): UserModel => ({
  ...rest,
  avatarUrl: avatar_url,
  publicRepos: public_repos,
  htmlUrl: html_url,
});
