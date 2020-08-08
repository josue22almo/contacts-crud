/* eslint-disable react/jsx-no-bind */
import React, { ChangeEvent } from "react";
import { observer } from "mobx-react";

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

import { Button } from "@material-ui/core";

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
          {this.renderButtons()}

          <AgGridReact
            onGridReady={this.contactUIStore.setGridAPI.bind(this.contactUIStore)}
            columnDefs={this.contactUIStore.columnDefs}
            rowData={store.contacts}
            rowSelection="multiple" />

          <ContactModal 
            isVisible={this.contactUIStore.isModalVisible} 
            onSubmit={this.handleModelSubmit.bind(this)}
            contactAttributes={this.contactUIStore.contactAttributes}
            onFirstNameFieldChange={(event: ChangeEvent) => this.contactUIStore.setAttribute("firstName", event)}
            onLastNameFieldChange={(event: ChangeEvent) => this.contactUIStore.setAttribute("lastName", event)}
            onEmailNameFieldChange={(event: ChangeEvent) => this.contactUIStore.setAttribute("email", event)}
            onPhoneNumberFieldChange={(event: ChangeEvent) => this.contactUIStore.setAttribute("phoneNumber", event)}
            handleClose={this.contactUIStore.closeModal.bind(this.contactUIStore)} />
        </div>
      </ContactUIStore.StoreProvider>

    );
  }

  private renderButtons() {
    return (
      <div>
        <Button 
          variant="contained" 
          onClick={this.openModelToCreateAContact.bind(this)}
          color="primary">
          Create new contact
        </Button>

        <Button 
          variant="contained" 
          onClick={this.deleteContacts.bind(this)}
          color="secondary">
          Delete selected contacts
        </Button>
        
        <Button 
          variant="contained" 
          onClick={this.openModelToUpdateContact.bind(this.openModelToUpdateContact)}
          color="default">
          Update contact
        </Button>
      </div>
    )
  }

  private async handleModelSubmit() {
    const { store } = this.props;
    alert("submit")
    if (this.contactUIStore.operation === "create") {
      await store.createContact(this.contactUIStore.contactAttributes)
    }
  }

  private openModelToCreateAContact() {
    this.contactUIStore.setOperation("create");
    this.contactUIStore.showModal();
  }

  private openModelToUpdateContact() {
    this.contactUIStore.setOperation("create");
    this.contactUIStore.showModal();
  }

  private async deleteContacts() {
    const { store } = this.props;
    
    const selectedContacts = this.getSelectedContacts();
    
    await store.deleteContacts(selectedContacts);

    return store.fetchContacts(); 
  }

  private getSelectedContacts(): IContact[] {
    const selectedNodes = this.contactUIStore.gridApi.getSelectedNodes()
    return selectedNodes.map( node => node.data );
  }
}
