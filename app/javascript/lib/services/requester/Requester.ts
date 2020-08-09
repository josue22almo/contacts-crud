/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosRequestConfig } from "axios";
import { IRequestResponse } from "./IRequestResponse";

export class Requester {
  public async sync<T>(requestConfig: AxiosRequestConfig): Promise<IRequestResponse<T>> {
    return (await axios.request(requestConfig));
  }
}

