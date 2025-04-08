import axios from 'axios';
import {
  GetRepoContributorsParams,
  GetRepoLanguagesParams,
  GetRepoReadmeParams,
  GetReposByOrgParams,
  GetSingleRepoParams,
  RepoApi,
  RepoContributorApi,
  RepoLanguagesApi,
  ReposApi,
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
  try {
    const response = await axiosInstance.request<ReposApi>({
      url: `/orgs/${org}/repos`,
      method: 'get',
      params: {
        type,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}

export async function getSingleRepo({ repo, owner }: GetSingleRepoParams) {
  try {
    const response = await axiosInstance.get<RepoApi>(`/repos/${owner}/${repo}`);

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}

export async function getRepoLanguages({ repo, owner }: GetRepoLanguagesParams) {
  try {
    const response = await axiosInstance.get<RepoLanguagesApi>(`/repos/${owner}/${repo}/languages`);

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}

export async function getRepoContributors({ repo, owner }: GetRepoContributorsParams) {
  try {
    const responseContributors = await axiosInstance.get<RepoContributorApi[]>(`/repos/${owner}/${repo}/contributors`);

    const usersPromises = responseContributors.data.map((data) => getUser(data.login));

    return await Promise.all(usersPromises);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}

export async function getUser(login: string) {
  try {
    const response = await axiosInstance.get<UserApi>(`/users/${login}`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}

export async function getReadme({ repo, owner }: GetRepoReadmeParams) {
  try {
    const response = await axiosInstance.request<string>({
      url: `/repos/${owner}/${repo}/readme`,
      method: 'get',
      headers: {
        Accept: 'application/vnd.github.html+json',
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
}
