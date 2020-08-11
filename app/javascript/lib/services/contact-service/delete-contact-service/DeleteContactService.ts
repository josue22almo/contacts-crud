import { BaseService } from "../../base-service/BaseService";
import { SucceedResponseHandler } from "../../response-handlers/SucceedResponseHandler/SucceedResponseHandler";
import { HTTP_METHOD } from "../../requester/HTTP_METHOD";

export class DeleteContactService extends BaseService {
  constructor(id: string) {
    super();
    this.baseURL = "http://localhost:3000/api/v1";
    this.path = `/contacts/${id}`;
    this.httpMethod = HTTP_METHOD.DELETE;
  }

  protected declareResponseHandler(): void {
    this.responseHandler = new SucceedResponseHandler(null);
  }
}
