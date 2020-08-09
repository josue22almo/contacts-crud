import { BaseService } from "../../BaseService/BaseService";
import { SucceedResponseHandler } from "../../response-handlers/SucceedResponseHandler/SucceedResponseHandler";
import { HTTP_METHOD } from "../../requester/HTTP_METHOD";
import { MailExistsResponseHandler } from "../../response-handlers/MailExistsResponseHandler/MailExistsResponseHandler";
import { IContractAttributes } from "../../../models/IContractAttributes";

export class CreateContactService extends BaseService {
  constructor(contactAttributes: IContractAttributes) {
    super();
    this.baseURL = "http://localhost:3000/api/v1/contacts";
    this.path = "/";
    this.httpMethod = HTTP_METHOD.POST;
    this.body = contactAttributes;
  }

  protected declareResponseHandler(): void {
    this.responseHandler = new SucceedResponseHandler(
                              new MailExistsResponseHandler(null)
                            );
  }
}