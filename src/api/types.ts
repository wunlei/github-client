export type Repos = Array<Repo>;

export type Repo = {
  id: number;
  name: string;
  private: boolean;
  owner: Owner;
  html_url: string;
  description?: string;
  updated_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  topics: string[];
};

export type Owner = {
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

export type RepoLanguages = {
  [key: string]: number;
};

export type RepoContributor = Omit<User, 'name'>;

export type User = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
};

export type GetReposByOrgParams = {
  org: string;
  page?: number;
  per_page?: number;
};
