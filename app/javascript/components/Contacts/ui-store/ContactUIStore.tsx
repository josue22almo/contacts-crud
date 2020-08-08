import React from "react";
import { observable, action, computed } from "mobx";
import { GridApi, GridReadyEvent } from "ag-grid-community";
import { IContractAttributes } from "../../../lib/models/IContractAttributes";

type OperationType = "create" | "update";

export class ContactUIStore {
  private static StoreContext = React.createContext({} as ContactUIStore);
 
  public static StoreProvider = ({ children, store }): JSX.Element => {
    return (
      <ContactUIStore.StoreContext.Provider value={store}>{children}</ContactUIStore.StoreContext.Provider>
    );
  }

  public gridApi: GridApi;

  public operation: OperationType;

  public readonly columnDefs = [
    {
      headerName: "Firs name", 
      field: "attributes.firstName", 
      sortable: true, 
      filter: true,
      checkboxSelection: true
    },
    {
      headerName: "Last name", 
      field: "attributes.lastName", 
      sortable: true, 
      filter: true
    },
    {
      headerName: "Email",
      field: "attributes.email", 
      sortable: true, 
      filter: true
    },
    {
      headerName: "Phone number",
      field: "attributes.phoneNumber", 
      sortable: true, 
      filter: true
    },
  ]

  @observable
  public isModalVisible: boolean;

  @observable
  public contactAttributes: IContractAttributes;

  constructor() {
    this.isModalVisible = false;
    this.contactAttributes = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    } as IContractAttributes;
  }

  @action
  public setAttribute(key: string, value: string): void {
    this.contactAttributes[key] = value;
  }

  @computed
  public get isSubmitButtonDisable(): boolean {
    return this.contactAttributes.firstName === "" 
           && this.contactAttributes.lastName === ""
           && this.contactAttributes.email === ""
           && this.contactAttributes.phoneNumber === "";
  }

  @action
  public closeModal(): void {
    this.isModalVisible = false;
  }

  @action
  public showModal(): void {
    this.isModalVisible = true;
  }

  public setGridAPI(event: GridReadyEvent): void {
    this.gridApi = event.api
  }

  public setOperation(operation: OperationType): void {
    this.operation = operation;
  }
}