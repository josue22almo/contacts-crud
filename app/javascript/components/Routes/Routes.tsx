import React from "react";
import { Route, Switch } from "react-router-dom";
import { Contacts } from "../Contacts/Contacts";

export class Routes extends React.Component {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route exact path="/" component={Contacts} />
      </Switch>
    );
  }
}
