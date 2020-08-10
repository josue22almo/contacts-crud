import { BaseService } from "../../BaseService/BaseService";
import { SucceedResponseHandler } from "../../response-handlers/SucceedResponseHandler/SucceedResponseHandler";
import { HTTP_METHOD } from "../../requester/HTTP_METHOD";
import { MailExistsResponseHandler } from "../../response-handlers/MailExistsResponseHandler/MailExistsResponseHandler";
import { IContactAttributes } from "../../../models/IContactAttributes";

export class CreateContactService extends BaseService {
  constructor(contactAttributes: IContactAttributes) {
    super();
    this.baseURL = "http://localhost:3000/api/v1";
    this.path = "/contacts";
    this.httpMethod = HTTP_METHOD.POST;
    this.body = contactAttributes;
  }

  protected declareResponseHandler(): void {
    this.responseHandler = new SucceedResponseHandler(
      new MailExistsResponseHandler(null)
    );
  }
}
