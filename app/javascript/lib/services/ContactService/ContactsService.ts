import { IContact } from "../../models/IContact";
import { IContractAttributes } from "../../models/IContractAttributes";
import { RetrieveContactsService } from "./retrieve-contacts-service/GetContactsService";
import { CreateContactService } from "./create-contact-service/CreateContactService";
import { UpdateContactService } from "./update-contact-service/UpdateContactService";
import { DeleteContactService } from "./delete-contact-service/DeleteContactService";

export class ContactService {
  public async retrieveContacts(): Promise<IContact[]> {
    return new RetrieveContactsService().communicateSync();
  }

  public async createContact(contactAttributes: IContractAttributes): Promise<IContact> {
    return new CreateContactService(contactAttributes).communicateSync();
  }

  public async updateContact(id: string, contactAttributes: IContractAttributes): Promise<IContact> {
    return new UpdateContactService(id, contactAttributes).communicateSync();
  }

  public async deleteContact(id: string): Promise<void> {
    return new DeleteContactService(id).communicateSync();
  }
}

