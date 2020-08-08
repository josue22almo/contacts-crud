/* eslint-disable react/jsx-no-bind */
import React from "react";
import { observer } from "mobx-react";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import { ContactStore } from "../../lib/stores/ContactsStore";
import { IContact } from "../../lib/models/IContact";
import { ContactModal } from "../ContactModal/ContactModal";
import { ContactUIStore } from "./ui-store/ContactUIStore";

interface IProps {
  store: ContactStore;
}

@(ContactStore.withStore as any)
@observer
export class Contacts extends React.Component<IProps> {
  private contactUIStore: ContactUIStore;

  constructor(props: IProps) {
    super(props);
    this.contactUIStore = new ContactUIStore();
  }

  public async componentDidMount(): Promise<void> {
    await this.props.store.fetchContacts();
  }

  public render (): JSX.Element {
    const { store } = this.props;
    return (
      <ContactUIStore.StoreProvider store={this.contactUIStore}>
        <div
          className="ag-theme-alpine-dark"
          style={{
          height: '250px',
          width: '600px' }}
        >
          <button onClick={this.createContact.bind(this)}>Add new contact</button>
          <button onClick={this.deleteContacts.bind(this)}>Delete selected contacts</button>
          <button onClick={this.updateContact.bind(this)}>Update contact</button>
          <AgGridReact
            onGridReady={this.contactUIStore.setGridAPI.bind(this.contactUIStore)}
            columnDefs={this.contactUIStore.columnDefs}
            rowData={store.contacts}
            rowSelection="multiple" />

          <ContactModal 
            isVisible={this.contactUIStore.isModalVisible} 
            handleClose={this.contactUIStore.closeModal.bind(this.contactUIStore)} />
            {/* <SimpleModal /> */}
        </div>
      </ContactUIStore.StoreProvider>

    );
  }

  private createContact() {
    this.contactUIStore.showModal();
  }

  private deleteContacts() {
    const { store } = this.props;
    
    const selectedContacts = this.getSelectedContacts();
    
    return store.deleteContacts(selectedContacts);
  }

  private updateContact() {
    this.contactUIStore.showModal();
  }

  private getSelectedContacts(): IContact[] {
    const selectedNodes = this.contactUIStore.gridApi.getSelectedNodes()
    return selectedNodes.map( node => node.data );
  }
}
