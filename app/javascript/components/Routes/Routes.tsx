import React from "react";
import { Route, Switch } from "react-router-dom";
import { Contacts } from "../Contacts/Contacts";
import { Contact } from "../Contact/Contact";

export class Routes extends React.Component {
  public render (): JSX.Element {
    return (
      <Switch>
        <Route exact path="/" component={Contacts} />
        <Route exact path="/contact/:id" component={Contact} />
      </Switch>
    );
  }
}
