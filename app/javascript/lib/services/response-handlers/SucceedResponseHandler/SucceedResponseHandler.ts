import { ResponseHandler } from "../../base-service/response-handler/ResponseHandler";
import { IRequestResponse } from "../../requester/IRequestResponse";

export class SucceedResponseHandler extends ResponseHandler {
  protected checkResponseStatus<T>(
    requestResponse: IRequestResponse<T>
  ): boolean {
    return requestResponse.status === 200;
  }

  protected resolveRequest<T>(requestResponse: IRequestResponse<T>): T {
    return requestResponse.data.data;
  }
}
