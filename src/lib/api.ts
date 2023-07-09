import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from './interceptors';

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: "https://api.github.com",
  responseType: 'json',
  // headers: {
  //   Accept: 'application/vnd.github+json',
  //   'X-GitHub-Api-Version': '2022-11-28',
  //   'Content-Type': 'application/json',
  // },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

api.interceptors.request.use(requestInterceptor);
api.interceptors.response.use(successInterceptor, errorInterceptor);

export { api };
