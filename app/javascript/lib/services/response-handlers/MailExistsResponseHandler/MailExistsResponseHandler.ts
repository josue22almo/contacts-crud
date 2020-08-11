import { ResponseHandler } from "../../base-service/response-handler/ResponseHandler";
import { IRequestResponse } from "../../requester/IRequestResponse";

export class MailExistsResponseHandler extends ResponseHandler {
  protected checkResponseStatus<T>(
    requestResponse: IRequestResponse<T>
  ): boolean {
    return requestResponse.status === 403;
  }

  protected resolveRequest(): any {
    return {
      error: "Mail exists",
    };
  }
}
