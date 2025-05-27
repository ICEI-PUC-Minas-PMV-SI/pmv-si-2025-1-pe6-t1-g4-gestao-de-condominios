import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import StorageHandler from '@/helper/StorageHandler';
import { Platform } from 'react-native';
import { API_URL } from '@env';

class Request {
  static getQueryParams(paramToBuild: any) {
    const searchParams = new URLSearchParams(Object.entries(paramToBuild));
    return searchParams.toString();
  }

  static removeStartEndBar(text: string) {
    return text.replace(/^\/|\/+$/g, '');
  }

  static async getServerUri(): Promise<string> {
    const serverUri = (await StorageHandler.getServerUrl()) || API_URL;
    return Request.removeStartEndBar(serverUri);
  }

  static async sendCustom<T = any>(url: string, options: AxiosRequestConfig): Promise<T> {
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };
    const { method, data, headers = {} } = options;
    const response: AxiosResponse<T> = await axios({
      method,
      url,
      data,
      headers: Object.assign(defaultHeaders, headers),
    });
    return response.data;
  }

  static async send<T = any>(endPoint: string, options: AxiosRequestConfig): Promise<T> {
    const serverUri = await Request.getServerUri();
    const endPointSanitized = Request.removeStartEndBar(endPoint);
    const URI = endPoint.includes('http') ? endPoint : `${serverUri}/${endPointSanitized}`;
    const { method, data, headers = {} } = options;
    const token = await StorageHandler.getAuthToken();

    const defaultHeaders = {
      'Content-Type': 'application/json',
      Authorization: '',
      'X-Platform': Platform.OS,
    };
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }
    const url = URI.endsWith('index.php') ? `${URI}/` : URI;
    const requestHeaders = Object.assign(defaultHeaders, headers);
    console.log(`
${method} ${url}
Headers:
${JSON.stringify(requestHeaders, null, 2)}
Data:
${JSON.stringify(data, null, 2)}
`);
    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        data,
        headers: requestHeaders,
      });
      return response.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(`[${err.response?.status}] ${url}
Data:
${JSON.stringify(err.response?.data, null, 2)}`);
      } else {
        console.log('Erro desconhecido:', err);
      }
      return Promise.reject(err);
    }
  }

  static async post<T = any>(endPoint: string, data: any = {}, options: AxiosRequestConfig = {}): Promise<T> {
    return Request.send<T>(endPoint, {
      ...options,
      method: 'POST',
      data,
    });
  }

  static async put<T = any>(endPoint: string, data: any = {}, options: AxiosRequestConfig = {}): Promise<T> {
    return Request.send<T>(endPoint, {
      ...options,
      method: 'PUT',
      data,
    });
  }

  static async get<T = any>(endPoint: string, params: any = {}, options: AxiosRequestConfig = {}): Promise<T> {
    const hasParams = Object.keys(params).length;
    const URI = `${endPoint}${hasParams ? '?' + Request.getQueryParams(params) : ''}`;
    return Request.send<T>(URI, { ...options, method: 'GET' });
  }

  static async delete<T = any>(endPoint: string, data: any = {}, options: AxiosRequestConfig = {}): Promise<T> {
    return Request.send<T>(endPoint, {
      ...options,
      method: 'DELETE',
      data,
    });
  }
}

export { Request };
export default Request;
