import { action } from "mobx";
import { IContact } from "../models/IContact";
import { ContactService } from "../services/contact-service/ContactsService";
import { IContactAttributes } from "../models/IContactAttributes";
import { IResponseError } from "../models/IResponseError";

export class ContactStore {
  private readonly contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
  }

  public createContact(
    attributes: IContactAttributes
  ): Promise<IContact | IResponseError> {
    return this.contactService.createContact(attributes);
  }

  @action
  public async retrieveContacts(): Promise<IContact[]> {
    return this.contactService.retrieveContacts();
  }

  public updateContact(
    id: string,
    attributes: IContactAttributes
  ): Promise<IContact> {
    return this.contactService.updateContact(id, attributes);
  }

  public async deleteContacts(contacts: IContact[]): Promise<void> {
    for (const contact of contacts) {
      await this.contactService.deleteContact(contact.id);
    }
  }
}
