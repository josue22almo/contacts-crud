import React from "react";
import { observer } from "mobx-react";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import { ContactStore } from "../../lib/stores/ContactsStore";
import { GridApi } from "ag-grid-community";
import { IContact } from "../../lib/models/IContact";

interface IProps {
  store: ContactStore;
}

@(ContactStore.withStore as any)
@observer
export class Contacts extends React.Component<IProps> {
  private readonly columnDefs = [
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

  private gridApi: GridApi;

  public async componentDidMount(): Promise<void> {
    await this.props.store.fetchContacts();
  }

  public render (): JSX.Element {
    const { store } = this.props;
    return (
      <div
        className="ag-theme-alpine-dark"
        style={{
        height: '250px',
        width: '600px' }}
      >
        <button onClick={this.deleteItems.bind(this)}>Delete</button>
        <AgGridReact
          onGridReady={ params => this.gridApi = params.api }
          columnDefs={this.columnDefs}
          rowData={store.contacts}
          rowSelection="multiple" 
        />
      </div>
    );
  }

  private deleteItems = async () => {
    const { store } = this.props;
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedContacts: IContact[] = selectedNodes.map( node => node.data )
    
    return store.deleteContacts(selectedContacts);
  }
}
