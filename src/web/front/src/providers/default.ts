import { DataProvider } from "@refinedev/core";
import { ApiUrl } from "../config/environment";
import axiosInstance from "../services/http";


const defaultProvider: DataProvider = {
  getList: async ({ resource, pagination }) => {
    const response = await axiosInstance.get(`${ApiUrl}/${resource}`, {
      params: {
        page: pagination?.current,
        per_page: pagination?.pageSize,
      },
    });

    const total = response.data.length;

    return {
      data: response.data,
      total,
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await axiosInstance.get(`${ApiUrl}/${resource}/${id}`);

    return {
      data: response.data,
    };
  },

  create: async ({ resource, variables }) => {
    const response = await axiosInstance.post(`${ApiUrl}/${resource}`, variables);

    return {
      data: response.data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const response = await axiosInstance.put(`${ApiUrl}/${resource}/${id}`, variables);

    return {
      data: response.data,
    }

  },

  deleteOne: async ({ resource, id }) => {
    const response = await axiosInstance.delete(`${ApiUrl}/${resource}/${id}`);

    return {
      data: response.data,
    }
  },

  getApiUrl: () => ApiUrl,
};


export default defaultProvider;
