import React from "react";

interface Props {
  greeting: string;
}

class App extends React.Component<Props> {
  public render (): JSX.Element {
  return <h1>Hello, world!: {this.props.greeting}</h1>;
  }
}

export default App;
