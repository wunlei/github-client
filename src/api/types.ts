export type ReposApi = Array<RepoApi>;

export type RepoApi = {
  id: number;
  name: string;
  private: boolean;
  owner: OwnerApi;
  html_url: string;
  description?: string;
  updated_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  topics: string[];
};

export type OwnerApi = {
  login: string;
  id: number;
  avatar_url: string;
  url: string;
  html_url: string;
};

export type GetSingleRepoParams = {
  repo: string;
  owner: string;
};

export type GetRepoLanguagesParams = GetSingleRepoParams;

export type GetRepoContributorsParams = GetSingleRepoParams;

export type GetRepoReadmeParams = GetSingleRepoParams;

export type RepoLanguagesApi = {
  [key: string]: number;
};

export type RepoContributorApi = Omit<UserApi, 'name'>;

export type UserApi = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
};

export type GetReposByOrgParams = {
  org: string;
  type?: string;
  page?: number;
  per_page?: number;
};
