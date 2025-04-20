import axios from 'axios';

const AUTH_TOKEN: string | undefined = import.meta.env.VITE_AUTH_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
    Authorization: AUTH_TOKEN && `Bearer ${AUTH_TOKEN}`,
    Accept: 'application/vnd.github+json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return { ...response, success: true, errorMessage: null };
  },
  (error) => {
    let status: number | null = null;
    let errorMessage = 'Unknown error';

    if (axios.isAxiosError(error)) {
      status = error.response?.status || null;
      if (status) {
        errorMessage = error.response?.data?.message || error.message;
      }
    }

    return {
      success: false,
      status,
      data: null,
      errorMessage,
    };
  },
);

export default axiosInstance;
