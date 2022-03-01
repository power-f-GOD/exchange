import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios';

export class Http {
  static token?: string | null = null;

  /**
   * @param options Axios request options object. PS. options.requiresAuth implies whether token/authentication will be required for the request
   */
  static async get<RequestType>(
    url: string,
    options?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data' | 'validateStatus'> & {
      requiresAuth?: boolean;
    }
  ): Promise<RequestType> {
    const response: AxiosResponse<RequestType> = await axios(
      Http.returnRequestConfig<RequestType>('GET', url, undefined, options)
    );

    return response.data;
  }

  /**
   * @param options Axios request options object. PS. options.requiresAuth implies whether token/authentication will be required for the request
   */
  static async post<RequestType, ResponseType = Record<string, any>>(
    url: string,
    data?: ResponseType,
    options?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data' | 'validateStatus'> & {
      requiresAuth?: boolean;
    }
  ): Promise<RequestType> {
    const response: AxiosResponse<RequestType> = await axios(
      Http.returnRequestConfig<ResponseType>('POST', url, data, options)
    );

    return response.data;
  }

  private static returnRequestConfig<T = any>(
    method: AxiosRequestConfig['method'],
    url: string,
    data?: T,
    options?: { requiresAuth?: boolean } & Omit<
      AxiosRequestConfig,
      'url' | 'method' | 'data' | 'validateStatus'
    >
  ): AxiosRequestConfig {
    const { requiresAuth, ...restOptions } = options || {};

    return {
      ...(restOptions || {}),
      url,
      method,
      headers: {
        ...(options?.headers || {}),
        ...(requiresAuth ? { Authorization: `Bearer ${this.token}` } : {}),
        'Content-Type': options?.headers?.contentType || 'application/json'
      },
      data,
      validateStatus: (status) => (!/^(2|3|4|5)/.test(`${status}`) ? false : true)
    };
  }

  static error(e: any) {
    const message = /network|connection|internet/i.test(e.message || e)
      ? "Hm.🤔 Something went wrong. Kindly check that you're connected to the internet."
      : e.message || e;

    if (process.env.NODE_ENV === 'development') {
      console.error('An error occured: ', e);
    }

    return {
      error: true,
      message: navigator.onLine
        ? `${message[0].toUpperCase()}${message.slice(1)}`
        : 'You are offline.'
    };
  }
}
