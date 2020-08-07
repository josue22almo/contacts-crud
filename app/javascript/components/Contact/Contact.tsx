import React from "react";
import { observer } from "mobx-react";
import { withStore, TestStore } from "../../services/stores/TestStore";
import Username from "../UserName/UserName";

interface IProps {
  store: TestStore;
}

@withStore
@observer
export class Contact extends React.Component<IProps> {
  public render (): JSX.Element {
    const { store } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <a
            className="App-link"
            href="https://codingislove.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {store.title}
          </a>
          <button onClick={this.toggleTitle} style={{ margin: 20 }}>
            Toggle title
          </button>
          <Username />
        </header>
      </div>
    );
  }

  private toggleTitle = () => {
    const { store } = this.props;
    if (store.title === "Coding is Love") {
      store.setTitle("Mobx React Context");
    } else {
      store.setTitle("Coding is Love");
    }
  };
}
