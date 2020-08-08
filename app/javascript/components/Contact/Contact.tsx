import React from "react";
import { observer } from "mobx-react";
import { ContactStore } from "../../lib/stores/ContactsStore";

interface IProps {
  store: ContactStore;
}

@(ContactStore.withStore as any)
@observer
export class Contact extends React.Component<IProps> {
  public render (): JSX.Element {
    return (
      <div className="App">
        Nice class
      </div>
    );
  }
}
