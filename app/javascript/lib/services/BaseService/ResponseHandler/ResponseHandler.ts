import { IRequestResponse } from "../../requester/IRequestResponse";

export abstract class ResponseHandler {

  protected nextResponseHandler: ResponseHandler | null;

  constructor(nextResponseHandler: ResponseHandler | null) {
    this.nextResponseHandler = nextResponseHandler;
  }

  public handle<T>(requestResponse: IRequestResponse<T>): any {
    if (this.checkResponseStatus(requestResponse)) {
      return this.resolveRequest(requestResponse);
    }

    if (this.nextResponseHandler !== null) {
      return this.nextResponseHandler.handle(requestResponse);
    }
    return null;
  }

  protected abstract checkResponseStatus<T>(requestResponse: IRequestResponse<T>): boolean;
  protected abstract resolveRequest<T>(requestResponse: IRequestResponse<T>): T;

}