import React from "react";
import { action, observable } from "mobx";
import { IContact } from "../models/IContact";
import { ContactService } from "../services/ContactsService";
import { IContractAttributes } from "../models/IContractAttributes";

export class ContactStore {
  private static StoreContext = React.createContext({} as ContactStore);
 
  public static StoreProvider = ({ children, store }): JSX.Element => {
    return (
      <ContactStore.StoreContext.Provider value={store}>{children}</ContactStore.StoreContext.Provider>
    );
  }

  public static useStore = (): ContactStore => React.useContext(ContactStore.StoreContext);

  public static withStore = (Component) => (props) => {
    return <Component {...props} store={ContactStore.useStore()} />;
  };

  private contactService: ContactService = new ContactService();
  @observable public contacts: IContact[] = [];


  @action
  public async fetchContacts(): Promise<void> {
    this.contacts = await this.contactService.getContacts();
  }

  public async deleteContacts(contacts: IContact[]): Promise<void> {
    for(const contact of contacts) { 
      await this.contactService.deleteContact(contact.id);
    }
  }

  public createContact(attributes: IContractAttributes): Promise<IContact> {
    return this.contactService.createContact(attributes);
  }
}
