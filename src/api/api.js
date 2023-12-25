import { ApiConstants } from "../constants";
import axios from "axios";
import Http from "./httpClient";

const defaultConfig = (headers) => ({
  baseURL: ApiConstants.BASE_URL,
  headers: { ...headers },
  timeout: ApiConstants.TIMEOUT,
});

const getCredentialWithAccessToken = (config) => {
  let accessToken = JSON.parse(localStorage.getItem("@token")) || "";
  if (!accessToken) return config;
  return {
    ...config,
    headers: {
      ...(config?.headers || {}),
      Authorization: "Bearer " + accessToken,
    },
  };
};

const configInterceptors = (axiosClient) => {
  axiosClient.interceptors.response.use(
    (res) => res.data,
    (res) => Promise.reject(res.response.data)
  );
  return axiosClient;
};

const axiosClient = configInterceptors(
  axios.create(defaultConfig(ApiConstants.HEADER_DEFAULT))
);

const ApiClientWithToken = new Http(axiosClient, getCredentialWithAccessToken);

const loginConfigInterceptors = (axiosClient) => {
  axiosClient.interceptors.response.use(
    (res) => res.data,
    (res) => Promise.reject(res.response.data)
  );
  return axiosClient;
};

export const LoginClient = loginConfigInterceptors(
  axios.create(defaultConfig(ApiConstants.HEADER_DEFAULT))
);

export default ApiClientWithToken;
