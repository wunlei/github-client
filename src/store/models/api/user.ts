import { UserApi } from 'api/types';

export type UserModel = {
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  name: string;
};

export const normalizeUser = ({ avatar_url, html_url, login, name }: UserApi): UserModel => ({
  login: login,
  avatarUrl: avatar_url,
  htmlUrl: html_url,
  name: name,
});
