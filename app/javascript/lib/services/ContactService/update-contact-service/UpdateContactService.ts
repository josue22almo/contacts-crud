import { BaseService } from "../../BaseService/BaseService";
import { SucceedResponseHandler } from "../../response-handlers/SucceedResponseHandler/SucceedResponseHandler";
import { HTTP_METHOD } from "../../requester/HTTP_METHOD";
import { IContractAttributes } from "../../../models/IContractAttributes";
import { MailExistsResponseHandler } from "../../response-handlers/MailExistsResponseHandler/MailExistsResponseHandler";

export class UpdateContactService extends BaseService {
  constructor(id: string, contactAttributes: Partial<IContractAttributes>) {
    super();
    this.baseURL = "http://localhost:3000/api/v1/contacts";
    this.path = `/${id}`;
    this.httpMethod = HTTP_METHOD.PATCH;
    this.body = contactAttributes;
  }

  protected declareResponseHandler(): void {
    this.responseHandler = new SucceedResponseHandler(
                              new MailExistsResponseHandler(null),
                            );
  }
}