import axios, { AxiosResponse } from "axios";
import { API_ERROR_400, API_ERROR_401, API_ERROR_403, API_ERROR_404, API_ERROR_500, API_ERROR_503, API_ERROR_ECONNABORTED, API_ERROR_NETWORK, API_UNKNOWN_ERROR } from "../constants/strings";
import { IApiResponse } from '../interfaces';

// Add delay for simulate real request
const delayMs = 300;

export class ApiHelper {

  private static service = axios.create({
    timeout: 10 * 1000,
  });

  private static baseUrl = process.env.REACT_APP_API_BASE_URL;

  static get = async (url: string): Promise<IApiResponse> => {

    await new Promise(resolve => setTimeout(() => resolve(true), delayMs));
    try {
      const res = await this.service.get(`${this.baseUrl}${url}`);
      return this.getResponse(res);
    } catch (error) {
      return this.getErrorResponse(error);
    }

  }

  static delete = async (url: string): Promise<IApiResponse> => {

    await new Promise(resolve => setTimeout(() => resolve(true), delayMs));
    try {
      const res = await this.service.delete(`${this.baseUrl}${url}`);
      return this.getResponse(res);
    } catch (error) {
      return this.getErrorResponse(error);
    }

  }

  static post = async (url: string, body: any): Promise<IApiResponse> => {

    await new Promise(resolve => setTimeout(() => resolve(true), delayMs));
    try {
      const res = await this.service.post(`${this.baseUrl}${url}`, body);
      return this.getResponse(res);
    } catch (error) {
      return this.getErrorResponse(error);
    }

  }

  static put = async (url: string, body: any): Promise<IApiResponse> => {

    await new Promise(resolve => setTimeout(() => resolve(true), delayMs));
    try {
      const res = await this.service.put(`${this.baseUrl}${url}`, body);
      return this.getResponse(res);
    } catch (error) {
      return this.getErrorResponse(error);
    }

  }

  static getResponse = (res: AxiosResponse<any, any>): IApiResponse => {
    return {
      error: null,
      data: res.data ?? null,
      status: res.status,
    }
  }

  static getErrorResponse = (error: any): IApiResponse => {
    if (axios.isAxiosError(error)) {
      return {
        error: this.getErrorByStatus(error.response?.status) ?? this.getErrorByCode(error.code) ?? error.message,
        data: null,
        status: error.response?.status ?? null,
      };
    } else {
      return {
        error: API_UNKNOWN_ERROR,
        data: null,
        status: null,
      };
    }
  }

  private static getErrorByStatus = (status?: number) => {
    switch (status) {
      case 400:
        return API_ERROR_400;
      case 401:
        return API_ERROR_401;
      case 403:
        return API_ERROR_403;
      case 404:
        return API_ERROR_404;
      case 500:
        return API_ERROR_500;
      case 503:
        return API_ERROR_503;
      default:
        return null;
    }
  }

  private static getErrorByCode = (code?: string) => {
    switch (code) {
      case 'ERR_NETWORK':
        return API_ERROR_NETWORK;
      case 'ECONNABORTED':
        return API_ERROR_ECONNABORTED;
      default:
        return null;
    }
  }

}