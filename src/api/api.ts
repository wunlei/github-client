import axios from 'axios';
import {
  GetRepoContributorsParams,
  GetRepoLanguagesParams,
  GetRepoReadmeParams,
  GetReposByOrgParams,
  GetSingleRepoParams,
  Repo,
  RepoContributor,
  RepoLanguages,
  Repos,
  User,
} from './types';

const AUTH_TOKEN: string | undefined = process.env.AUTH_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: `Bearer ${AUTH_TOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});

export async function getReposByOrg({ org, page = 1, per_page = 3 }: GetReposByOrgParams) {
  try {
    const response = await axiosInstance.request<Repos>({
      url: `/orgs/${org}/repos`,
      method: 'get',
      params: {
        type: 'all',
        page,
        per_page,
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
    const response = await axiosInstance.get<Repo>(`/repos/${owner}/${repo}`);

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
    const response = await axiosInstance.get<RepoLanguages>(`/repos/${owner}/${repo}/languages`);

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
    const responseContributors = await axiosInstance.get<RepoContributor[]>(`/repos/${owner}/${repo}/contributors`);

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
    const response = await axiosInstance.get<User>(`/users/${login}`);
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
