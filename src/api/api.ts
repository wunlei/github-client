import axiosInstance from 'api/instance';
import {
  GetRepoContributorsParams,
  GetRepoLanguagesParams,
  GetRepoReadmeParams,
  GetReposByOrgParams,
  GetSingleRepoParams,
  RepoApi,
  RepoContributorApi,
  RepoLanguagesApi,
  SearchUsersResponse,
  UserApi,
  ResponseAxios,
} from './types';

export async function getReposByOrg({ org, type = 'all' }: GetReposByOrgParams): Promise<ResponseAxios<RepoApi[]>> {
  return axiosInstance.request({
    url: `/orgs/${org}/repos`,
    method: 'get',
    params: {
      type,
    },
  });
}

export async function getSingleRepo({ repo, owner }: GetSingleRepoParams): Promise<ResponseAxios<RepoApi>> {
  return axiosInstance.get(`/repos/${owner}/${repo}`);
}

export async function getRepos(repos: GetSingleRepoParams[]) {
  const reposPromises = await Promise.all(repos.map((data) => getSingleRepo(data)));

  const result: RepoApi[] = [];

  reposPromises.forEach((repo) => {
    if (repo.success) {
      result.push(repo.data);
    }
  });

  return {
    success: true,
    data: result,
    errorMessage: null,
    status: 200,
  };
}

export async function getRepoLanguages({
  repo,
  owner,
}: GetRepoLanguagesParams): Promise<ResponseAxios<RepoLanguagesApi>> {
  return axiosInstance.get(`/repos/${owner}/${repo}/languages`);
}

export async function getRepoContributors({ repo, owner }: GetRepoContributorsParams) {
  const responseContributors: ResponseAxios<RepoContributorApi[]> = await axiosInstance.get(
    `/repos/${owner}/${repo}/contributors`,
  );

  if (!responseContributors.success) {
    return responseContributors;
  }

  const usersPromises = await Promise.all(responseContributors.data.map((data) => getUser(data.login)));

  const result: UserApi[] = [];

  usersPromises.forEach((user) => {
    if (user.success) {
      result.push(user.data);
    }
  });

  return {
    success: true,
    data: result,
    errorMessage: null,
    status: 200,
  };
}

export async function getUser(login: string): Promise<ResponseAxios<UserApi>> {
  return axiosInstance.get(`/users/${login}`);
}

export async function getReadme({ repo, owner }: GetRepoReadmeParams): Promise<ResponseAxios<string>> {
  return axiosInstance.request({
    url: `/repos/${owner}/${repo}/readme`,
    method: 'get',
    headers: {
      Accept: 'application/vnd.github.html+json',
    },
  });
}

export async function searchUsers(name: string): Promise<ResponseAxios<SearchUsersResponse>> {
  return axiosInstance.get(`/search/users?q=${name}`);
}

export async function getUserRepos(name: string): Promise<ResponseAxios<RepoApi[]>> {
  return axiosInstance.get(`users/${name}/repos`, {
    params: {
      per_page: 5,
      page: 1,
      sort: 'updated',
    },
  });
}
