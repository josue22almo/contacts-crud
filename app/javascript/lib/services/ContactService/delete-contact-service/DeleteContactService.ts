import { BaseService } from "../../BaseService/BaseService";
import { SucceedResponseHandler } from "../../response-handlers/SucceedResponseHandler/SucceedResponseHandler";
import { HTTP_METHOD } from "../../requester/HTTP_METHOD";

export class DeleteContactService extends BaseService {
  constructor(id: string) {
    super();
    this.baseURL = "http://localhost:3000/api/v1/contacts";
    this.path = `/${id}`;
    this.httpMethod = HTTP_METHOD.DELETE;
  }

  protected declareResponseHandler(): void {
    this.responseHandler = new SucceedResponseHandler(null);
  }
}