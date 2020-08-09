import { BaseService } from "../../BaseService/BaseService";
import { SucceedResponseHandler } from "../../response-handlers/SucceedResponseHandler/SucceedResponseHandler";
import { HTTP_METHOD } from "../../requester/HTTP_METHOD";

export class RetrieveContactsService extends BaseService {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/api/v1/contacts";
    this.path = "/";
    this.httpMethod = HTTP_METHOD.GET;
  }

  protected declareResponseHandler(): void {
    this.responseHandler = new SucceedResponseHandler(null);
  }
}