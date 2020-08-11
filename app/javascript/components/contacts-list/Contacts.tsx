/* eslint-disable react/jsx-no-bind */
import React, { ChangeEvent } from "react";
import { observer } from "mobx-react";

import { Button } from "@material-ui/core";

import { ContactStore } from "../../lib/stores/ContactsStore";
import { ContactModal } from "../contact-modal/ContactModal";
import { ContactUIStore } from "./ui-store/ContactUIStore";
import { ContactsGrid } from "../contacts-grid/ContactsGrid";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

@observer
export class Contacts extends React.Component<IProps> {
  private contactUIStore: ContactUIStore;

  constructor(props: IProps) {
    super(props);
    this.contactUIStore = new ContactUIStore(new ContactStore());
  }

  public async componentDidMount(): Promise<void> {
    await this.contactUIStore.updateContacts();
  }

  public render(): JSX.Element {
    return (
      <ContactUIStore.StoreProvider store={this.contactUIStore}>
        <div
          className="ag-theme-alpine-dark"
          style={{
            height: "550px",
            width: "5500px",
          }}
        >
          {this.renderButtons()}

          <ContactsGrid
            onGridReady={this.contactUIStore.setGridAPI.bind(
              this.contactUIStore
            )}
            columnDefs={this.contactUIStore.columnDefs}
            contacts={this.contactUIStore.contacts}
          />

          <ContactModal
            isVisible={this.contactUIStore.isModalVisible}
            error={this.contactUIStore.error}
            onSubmit={this.contactUIStore.handleModelSubmit.bind(
              this.contactUIStore
            )}
            submitAction={this.contactUIStore.operation}
            isSubmitButtonDisable={this.contactUIStore.isSubmitButtonDisable}
            contactAttributes={this.contactUIStore.contactAttributes}
            onFirstNameFieldChange={(event: ChangeEvent) => {
              this.contactUIStore.setAttribute(
                "firstName",
                (event.target as any).value
              );
            }}
            onLastNameFieldChange={(event: ChangeEvent) =>
              this.contactUIStore.setAttribute(
                "lastName",
                (event.target as any).value
              )
            }
            onEmailNameFieldChange={(event: ChangeEvent) =>
              this.contactUIStore.setAttribute(
                "email",
                (event.target as any).value
              )
            }
            onPhoneNumberFieldChange={(event: ChangeEvent) =>
              this.contactUIStore.setAttribute(
                "phoneNumber",
                (event.target as any).value
              )
            }
            handleClose={this.contactUIStore.closeModal.bind(
              this.contactUIStore
            )}
          />
        </div>
      </ContactUIStore.StoreProvider>
    );
  }

  private renderButtons() {
    return (
      <div>
        <Button
          variant="contained"
          onClick={this.contactUIStore.openModelToCreateAContact.bind(
            this.contactUIStore
          )}
          color="primary"
        >
          Create new contact
        </Button>

        <Button
          variant="contained"
          onClick={this.contactUIStore.deleteContacts.bind(this.contactUIStore)}
          color="secondary"
        >
          Delete selected contacts
        </Button>

        <Button
          variant="contained"
          onClick={this.contactUIStore.openModelToUpdateContact.bind(
            this.contactUIStore
          )}
          color="default"
        >
          Update contact
        </Button>
      </div>
    );
  }
}
