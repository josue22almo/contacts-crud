import React from "react";
import { observable, action, computed } from "mobx";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { IContactAttributes } from "../../../lib/models/IContactAttributes";
import { OperationType } from "./OperationType";
import { IContact } from "../../../lib/models/IContact";

export class ContactUIStore {
  private static StoreContext = React.createContext({} as ContactUIStore);

  public static StoreProvider = ({ children, store }): JSX.Element => {
    return (
      <ContactUIStore.StoreContext.Provider value={store}>
        {children}
      </ContactUIStore.StoreContext.Provider>
    );
  };

  public gridApi: GridApi;

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

  constructor() {
    this.isModalVisible = false;
    this.resetContactAttributes();
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
  public closeModal(): void {
    this.isModalVisible = false;
    this.resetContactAttributes();
  }

  @action
  public setContact(contact: IContact): void {
    this.id = contact.id;
    this.contactAttributes = contact.attributes;
  }

  private resetContactAttributes() {
    this.id = "";
    this.contactAttributes = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    };
  }

  @action
  public showModal(): void {
    this.isModalVisible = true;
  }

  public setGridAPI(event: GridReadyEvent): void {
    this.gridApi = event.api;
  }

  public setOperation(operation: OperationType): void {
    this.operation = operation;
  }
}
