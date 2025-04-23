import axios, { AxiosRequestConfig } from "axios";
import Cookie from "js-cookie";

interface RetryConfig extends AxiosRequestConfig {
  retryTimes?: number;
  retryDelay?: number;
  __retryCount?: number;
}

const axiosInstance = axios.create();

axiosInstance.defaults.headers.common["Accept"] = "application/json";

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config as RetryConfig;

    if (!config || !config.retryTimes) {
      return Promise.reject(error);
    }

    config.__retryCount = config.__retryCount || 0;

    if (config.__retryCount >= config.retryTimes) {
      return Promise.reject(error);
    }

    config.__retryCount++;

    const delay = config.retryDelay ?? 300;
    await new Promise((resolve) => setTimeout(resolve, delay));

    return axiosInstance(config);
  }
);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = Cookie.get("refine-auth");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
