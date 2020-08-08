import React from "react";
import { observer } from "mobx-react";
import { ContactStore } from "../../lib/stores/ContactsStore";

interface IProps {
  store: ContactStore;
}

@(ContactStore.withStore as any)
@observer
export class Contacts extends React.Component<IProps> {
  public async componentDidMount(): Promise<void> {
    await this.props.store.fetchContacts();
  }

  public render (): JSX.Element {
    return (
        <div>Index for contacts</div>
      );
  }
}
