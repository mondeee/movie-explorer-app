import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

let ROOT_URL = '';

export const buildAcceptHeader = (): AxiosRequestConfig => ({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const buildTokenAcceptHeader = (token: string): AxiosRequestConfig => ({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: token,
  },
});

export const buildURL = (path: string): string => {
  return ROOT_URL + path;
};

export const getRequest = (
  path: string,
  config: AxiosRequestConfig,
): Promise<AxiosResponse<any>> =>
  axios
    .get(path, config)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(path);
      e.msg = e;
      return e;
    });

export const postRequest = (
  path: string,
  payload: any,
  config: AxiosRequestConfig,
): Promise<AxiosResponse<any>> =>
  axios
    .post(path, payload, config)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      console.log(e);
      console.log(path, payload, config);
      e.msg = e;
      return e;
    });

export const patchRequest = (
  path: string,
  payload: any,
  config: AxiosRequestConfig,
): Promise<AxiosResponse<any>> =>
  axios
    .patch(path, payload, config)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      e.msg = e;
      return e;
    });

export const putRequest = (
  path: string,
  payload: any,
  config: AxiosRequestConfig,
): Promise<AxiosResponse<any>> =>
  axios
    .put(path, payload, config)
    .then(response => {
      return response.data;
    })
    .catch(e => {
      e.msg = e;
      return e;
    });
