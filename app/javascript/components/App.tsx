import React from "react";
import { Routes } from "./Routes/Routes";
import { StoreProvider, TestStore } from "../services/stores/TestStore";


const testStore = new TestStore();

class App extends React.Component {
  public render (): JSX.Element {
    return (
      <StoreProvider store={testStore}>
        <Routes />
      </StoreProvider>
    );
  }
}

export default App;
