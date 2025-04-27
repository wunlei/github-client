import { UserModel } from 'store/models/api';

export type UserModelLS = {
  login: string;
  id: number;
  avatarUrl: string;
};

export const normalizeUserLS = ({ login, id, avatarUrl }: UserModel): UserModelLS => ({
  login,
  id,
  avatarUrl,
});
