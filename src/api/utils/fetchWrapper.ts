import axios, { AxiosResponse } from 'axios';
import { ResponseFail, ResponseSuccess } from 'api/types';

async function fetchWrapper<T>(request: Promise<AxiosResponse<T>>): Promise<ResponseFail | ResponseSuccess<T>> {
  try {
    const response = await request;

    return {
      success: true,
      status: response.status,
      data: response.data,
      errorMessage: null,
    };
  } catch (error) {
    let status: number | null = null;
    let errorMessage: string = 'Unknown error';

    if (axios.isAxiosError(error)) {
      status = error.response?.status || null;
      if (status) {
        errorMessage = error.response?.data?.message || error.message;
      }
    }

    return {
      success: false,
      status: status,
      data: null,
      errorMessage: errorMessage,
    };
  }
}

export default fetchWrapper;
