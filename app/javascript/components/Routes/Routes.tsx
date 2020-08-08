import React from "react";
import { Route, Switch } from "react-router-dom";
import { Contacts } from "../Contacts/Contacts";
import { Contact } from "../Contact/Contact";
import { ContactStore } from "../../lib/stores/ContactsStore";

export class Routes extends React.Component {
  private readonly contactStore = new ContactStore();

  public render (): JSX.Element {
    return (
      <Switch>
        <ContactStore.StoreProvider store={this.contactStore}>
          <Route exact path="/contact/:id" component={Contact} />
          <Route exact path="/" component={Contacts} />
        </ContactStore.StoreProvider>
      </Switch>
    );
  }
}
