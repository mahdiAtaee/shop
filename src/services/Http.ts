import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export default class Http {
  private baseURL: string;
  private instance: AxiosInstance;

  constructor() {
    // this.baseURL = "https://deployshop.onrender.com";
    this.baseURL = "http://localhost:5000";
    this.instance = axios.create();
  }

  public post<T, B, R = AxiosResponse<T>>(
    endPoint: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.post(`${this.baseURL}/${endPoint}`, data, config);
  }

  public get<T, R = AxiosResponse<T>>(
    endPoint: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.get(`${this.baseURL}/${endPoint}`, config);
  }

  public put<T, B, R = AxiosResponse<T>>(
    endPoint: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.put(`${this.baseURL}/${endPoint}`, data, config);
  }

  public patch<T, B, R = AxiosResponse<T>>(
    endPoint: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.instance.patch(`${this.baseURL}/${endPoint}`, data, config);
  }
}
