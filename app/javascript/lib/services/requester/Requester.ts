import axios, { AxiosRequestConfig } from "axios";
import { HTTP_METHOD } from "./HTTP_METHOD";
import { IRequesterConfig } from "./IRequesterConfig";
import { IRequesterResponse } from "./IRequesterResponse";

export class Requester {
  private readonly config: IRequesterConfig;

  constructor(config: IRequesterConfig) {
    this.config = config;
  }

  public get<T>(url: string, query?: Record<string, unknown>): Promise<IRequesterResponse<T>> {
    return this.call({
      ...this.config,
      url,
      method: HTTP_METHOD.GET,
      params: query,
    });
  }

  public delete<T>(url: string): Promise<IRequesterResponse<T>> {
    return this.call({
      ...this.config,
      url,
      method: HTTP_METHOD.DELETE,
    });
  }

  private async call<T>(requestConfig: AxiosRequestConfig): Promise<T> {
    return (await axios.request(requestConfig)).data;
  }
}

