import React from "react";
import { Route, Switch } from "react-router-dom";
import { ContactsList } from "../contacts-list/ContactsList";

export class Routes extends React.Component {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route exact path="/" component={ContactsList} />
      </Switch>
    );
  }
}
