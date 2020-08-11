import { IContact } from "../../models/IContact";
import { IContactAttributes } from "../../models/IContactAttributes";
import { RetrieveContactsService } from "./retrieve-contacts-service/GetContactsService";
import { CreateContactService } from "./create-contact-service/CreateContactService";
import { UpdateContactService } from "./update-contact-service/UpdateContactService";
import { DeleteContactService } from "./delete-contact-service/DeleteContactService";
import { IResponseError } from "../../models/IResponseError";

export class ContactService {
  public async retrieveContacts(): Promise<IContact[]> {
    return new RetrieveContactsService().communicateSync();
  }

  public async createContact(
    contactAttributes: IContactAttributes
  ): Promise<IContact | IResponseError> {
    return new CreateContactService(contactAttributes).communicateSync();
  }

  public async updateContact(
    id: string,
    contactAttributes: IContactAttributes
  ): Promise<IContact> {
    return new UpdateContactService(id, contactAttributes).communicateSync();
  }

  public async deleteContact(id: string): Promise<void> {
    return new DeleteContactService(id).communicateSync();
  }
}
