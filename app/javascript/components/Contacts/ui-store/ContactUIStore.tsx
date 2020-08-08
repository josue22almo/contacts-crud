import React from "react";
import { observable, action } from "mobx";
import { GridApi, GridReadyEvent } from "ag-grid-community";

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

  constructor() {
    this.isModalVisible = false;
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
}