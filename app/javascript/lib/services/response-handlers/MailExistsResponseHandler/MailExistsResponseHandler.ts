import { ResponseHandler } from "../../BaseService/ResponseHandler/ResponseHandler";
import { IRequestResponse } from "../../requester/IRequestResponse";

export class MailExistsResponseHandler extends ResponseHandler {
  protected checkResponseStatus<T>(requestResponse: IRequestResponse<T>): boolean {
    debugger;
    return requestResponse.status === 403;
  }

  protected resolveRequest(): any {
    return {
      error: "Mail exists"
    };
  }
}
