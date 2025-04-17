import { SearchUserApi } from 'api/types';

export type SearchUserModel = {
  login: string;
  id: number;
  avatarUrl: string;
};

export const normalizeSearchUser = ({ avatar_url, ...rest }: SearchUserApi): SearchUserModel => ({
  ...rest,
  avatarUrl: avatar_url,
});
