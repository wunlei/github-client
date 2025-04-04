import { OwnerApi } from 'api/types';

export type OwnerModel = {
  login: string;
  id: number;
  avatarUrl: string;
  url: string;
  htmlUrl: string;
};

export const normalizeOwner = ({ avatar_url, html_url, id, login, url }: OwnerApi): OwnerModel => ({
  login: login,
  id: id,
  url: url,
  avatarUrl: avatar_url,
  htmlUrl: html_url,
});
