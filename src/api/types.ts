export type ResponseSuccess<T> = {
  success: true;
  errorMessage: null;
  status: number;
  data: T;
};

export type ResponseFail = {
  success: false;
  errorMessage: string;
  status: number | null;
  data: null;
};

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
  language: string | null;
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
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
};

export type SearchUserApi = {
  login: string;
  id: number;
  avatar_url: string;
};

export type SearchUsersResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: SearchUserApi[];
};

export type GetReposByOrgParams = {
  org: string;
  type?: string;
  page?: number;
  per_page?: number;
};
