import { BaseService } from "../../base-service/BaseService";
import { SucceedResponseHandler } from "../../response-handlers/SucceedResponseHandler/SucceedResponseHandler";
import { HTTP_METHOD } from "../../requester/HTTP_METHOD";

export class RetrieveContactsService extends BaseService {
  constructor() {
    super();
    this.baseURL = "http://localhost:3000/api/v1";
    this.path = "/contacts";
    this.httpMethod = HTTP_METHOD.GET;
  }

  protected declareResponseHandler(): void {
    this.responseHandler = new SucceedResponseHandler(null);
  }
}
