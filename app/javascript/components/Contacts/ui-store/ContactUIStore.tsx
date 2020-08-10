import React from "react";
import { observable, action, computed } from "mobx";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { IContactAttributes } from "../../../lib/models/IContactAttributes";
import { OperationType } from "./OperationType";
import { IContact } from "../../../lib/models/IContact";
import { ContactStore } from "../../../lib/stores/ContactsStore";
import { IResponseError } from "../../../lib/models/IResponseError";

export class ContactUIStore {
  private static StoreContext = React.createContext({} as ContactUIStore);

  public static StoreProvider = ({ children, store }): JSX.Element => {
    return (
      <ContactUIStore.StoreContext.Provider value={store}>
        {children}
      </ContactUIStore.StoreContext.Provider>
    );
  };

  private gridApi: GridApi;

  public operation: OperationType;

  public readonly columnDefs = [
    {
      headerName: "Firs name",
      field: "attributes.firstName",
      sortable: true,
      filter: true,
      checkboxSelection: true,
    },
    {
      headerName: "Last name",
      field: "attributes.lastName",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Email",
      field: "attributes.email",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Phone number",
      field: "attributes.phoneNumber",
      sortable: true,
      filter: true,
    },
  ];

  @observable
  public isModalVisible: boolean;

  @observable
  public contactAttributes: IContactAttributes;
  public id: string;

  @observable
  public error = "";

  constructor(private readonly contactStore: ContactStore) {
    this.isModalVisible = false;
    this.restore();
  }

  @action
  public setAttribute(key: string, value: string): void {
    this.contactAttributes[key] = value;
  }

  @computed
  public get isSubmitButtonDisable(): boolean {
    return (
      this.contactAttributes.firstName === "" ||
      this.contactAttributes.lastName === "" ||
      this.contactAttributes.email === "" ||
      this.contactAttributes.phoneNumber === ""
    );
  }

  @action
  public setContact(contact: IContact): void {
    this.id = contact.id;
    this.contactAttributes = contact.attributes;
  }

  @action
  public setError(error: string): void {
    this.error = error;
  }

  private restore() {
    this.id = "";
    this.error = "";
    this.contactAttributes = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    };
  }

  public setGridAPI(event: GridReadyEvent): void {
    this.gridApi = event.api;
  }

  public setOperation(operation: OperationType): void {
    this.operation = operation;
  }

  public async handleModelSubmit(): Promise<void> {
    if (this.operation === "create") {
      return this.handleCreation();
    }
    return this.handleUpdate();
  }

  private async handleCreation() {
    const result = await this.contactStore.createContact(
      this.contactAttributes
    );
    if ((result as IResponseError).error) {
      this.setError((result as IResponseError).error);
      return;
    }

    this.closeModal();
    await this.contactStore.fetchContacts();
  }

  public openModelToCreateAContact(): void {
    this.setOperation("create");
    this.showModal();
  }

  @action
  private showModal(): void {
    this.isModalVisible = true;
  }

  public async deleteContacts(): Promise<void> {
    const selectedContacts = this.getSelectedContacts();

    if (selectedContacts.length === 0) {
      alert("Select at least one contact to delete");
      return;
    }

    await this.contactStore.deleteContacts(selectedContacts);

    return this.contactStore.fetchContacts();
  }

  public openModelToUpdateContact(): void {
    const selectedContacts = this.getSelectedContacts();

    if (selectedContacts.length === 0) {
      alert("Chose a contact to update");
    } else if (selectedContacts.length === 1) {
      const selectedContact: IContact = selectedContacts[0];
      this.setOperation("update");
      this.setContact({ ...selectedContact });
      this.showModal();
    } else {
      alert("Can not update more than 1 contact. Please chose only one.");
    }
  }

  private async handleUpdate() {
    await this.contactStore.updateContact(this.id, this.contactAttributes);
    this.closeModal();
    await this.contactStore.fetchContacts();
  }

  @action
  public closeModal(): void {
    this.isModalVisible = false;
    this.restore();
  }

  private getSelectedContacts(): IContact[] {
    const selectedNodes = this.gridApi.getSelectedNodes();
    return selectedNodes.map((node) => node.data);
  }
}
