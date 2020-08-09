/* eslint-disable @typescript-eslint/ban-types */
import { ResponseHandler } from "./ResponseHandler/ResponseHandler";
import { Requester } from "../requester/Requester";
import { HTTP_METHOD } from "../requester/HTTP_METHOD";
import { IRequestResponse } from "../requester/IRequestResponse";

export abstract class BaseService<T = any> {
  protected responseHandler: ResponseHandler;

  protected baseURL: string;
  protected path: string;
  protected httpMethod: HTTP_METHOD;
  protected body?: object;
  protected headers?: object;
  protected qs?: object;

  private readonly requester: Requester;

  constructor() {
    this.requester = new Requester();
    this.declareResponseHandler();
  }

  public async communicateSync(): Promise<T | null> {
    const requestResponse = await this.executeRequest();
    return this.responseHandler.handle(requestResponse);
  }

  protected abstract declareResponseHandler(): void;

  protected async executeRequest<T>(): Promise<IRequestResponse<T>> {
    try {
      return await this.requester.sync(
        {
          baseURL: this.baseURL + this.path,
          method: this.httpMethod,
          data: this.body,
          headers: this.headers,
          params: this.qs,
        }
      );
    } catch (error) {
      return error;
    }
  }
}
