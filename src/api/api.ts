import axios from 'axios';
import fetchWrapper from 'api/utils';
import {
  GetRepoContributorsParams,
  GetRepoLanguagesParams,
  GetRepoReadmeParams,
  GetReposByOrgParams,
  GetSingleRepoParams,
  RepoApi,
  RepoContributorApi,
  RepoLanguagesApi,
  ResponseFail,
  ResponseSuccess,
  SearchUsersResponse,
  UserApi,
} from './types';

const AUTH_TOKEN: string | undefined = import.meta.env.VITE_AUTH_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: AUTH_TOKEN && `Bearer ${AUTH_TOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});

export async function getReposByOrg({ org, type = 'all' }: GetReposByOrgParams) {
  return await fetchWrapper(
    axiosInstance.request<RepoApi[]>({
      url: `/orgs/${org}/repos`,
      method: 'get',
      params: {
        type,
      },
    }),
  );
}

export async function getSingleRepo({ repo, owner }: GetSingleRepoParams) {
  return await fetchWrapper(axiosInstance.get<RepoApi>(`/repos/${owner}/${repo}`));
}

export async function getRepoLanguages({ repo, owner }: GetRepoLanguagesParams) {
  return await fetchWrapper(axiosInstance.get<RepoLanguagesApi>(`/repos/${owner}/${repo}/languages`));
}

export async function getRepoContributors({
  repo,
  owner,
}: GetRepoContributorsParams): Promise<ResponseFail | ResponseSuccess<UserApi[]>> {
  const responseContributors = await fetchWrapper(
    axiosInstance.get<RepoContributorApi[]>(`/repos/${owner}/${repo}/contributors`),
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

export async function getUser(login: string) {
  return await fetchWrapper(axiosInstance.get<UserApi>(`/users/${login}`));
}

export async function getReadme({ repo, owner }: GetRepoReadmeParams) {
  return await fetchWrapper(
    axiosInstance.request<string>({
      url: `/repos/${owner}/${repo}/readme`,
      method: 'get',
      headers: {
        Accept: 'application/vnd.github.html+json',
      },
    }),
  );
}

export async function searchUsers(name: string) {
  return await fetchWrapper(axiosInstance.get<SearchUsersResponse>(`/search/users?q=${name}`));
}

export async function getUserRepos(name: string) {
  return await fetchWrapper(
    axiosInstance.get<RepoApi[]>(`users/${name}/repos`, {
      params: {
        per_page: 5,
        page: 1,
        sort: 'updated',
      },
    }),
  );
}
