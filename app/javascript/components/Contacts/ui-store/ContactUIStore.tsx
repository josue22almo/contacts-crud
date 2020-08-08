import React, { ChangeEvent } from "react";
import { observable, action } from "mobx";
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

  // public static useStore = (): ContactUIStore => React.useContext(ContactUIStore.StoreContext);

  // public static withStore = (Component) => (props) => {
  //   return <Component {...props} store={ContactUIStore.useStore()} />;
  // };

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
    this.contactAttributes = {} as IContractAttributes;
  }

  @action
  public setAttribute(key: string, event: ChangeEvent): void {
    // this.contactAttributes[key] = value;
    alert(event);
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