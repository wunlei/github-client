import { UserApi } from 'api/types';

export type UserModel = {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  name: string;
};

export const normalizeUser = ({ avatar_url, html_url, ...rest }: UserApi): UserModel => ({
  ...rest,
  avatarUrl: avatar_url,
  htmlUrl: html_url,
});
