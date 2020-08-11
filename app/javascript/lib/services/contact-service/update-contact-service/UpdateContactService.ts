import { BaseService } from "../../base-service/BaseService";
import { SucceedResponseHandler } from "../../response-handlers/SucceedResponseHandler/SucceedResponseHandler";
import { HTTP_METHOD } from "../../requester/HTTP_METHOD";
import { IContactAttributes } from "../../../models/IContactAttributes";
import { MailExistsResponseHandler } from "../../response-handlers/MailExistsResponseHandler/MailExistsResponseHandler";

export class UpdateContactService extends BaseService {
  constructor(id: string, contactAttributes: Partial<IContactAttributes>) {
    super();
    this.baseURL = "http://localhost:3000/api/v1";
    this.path = `/contacts/${id}`;
    this.httpMethod = HTTP_METHOD.PATCH;
    this.body = contactAttributes;
  }

  protected declareResponseHandler(): void {
    this.responseHandler = new SucceedResponseHandler(
      new MailExistsResponseHandler(null)
    );
  }
}
