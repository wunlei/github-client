import { OwnerApi } from 'api/types';

export type OwnerModel = {
  login: string;
  id: number;
  avatarUrl: string;
  url: string;
  htmlUrl: string;
};

export const normalizeOwner = ({ avatar_url, html_url, ...rest }: OwnerApi): OwnerModel => ({
  ...rest,
  avatarUrl: avatar_url,
  htmlUrl: html_url,
});
