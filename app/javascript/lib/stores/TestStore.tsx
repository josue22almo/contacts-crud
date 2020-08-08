import React from "react";
import { action, observable } from "mobx";
 
interface IUser {
  userId: number;
  name: string;
  website: string;
  email: string;
}

/* Store start */
export class TestStore {
  @observable title = "Coding is Love";
 
  @observable user: IUser = {
    userId: 1,
    name: "Ranjith kumar V",
    website: "https://codingislove.com",
    email: "ranjith@codingislove.com",
  };
 
  @action
  public setUser(user: IUser): void {
    this.user = user;
  }
 
  @action
  public updateUser(data: Partial<IUser>): void {
    this.user = { ...this.user, ...data };
  }
 
  @action
  public clearUser(): void {
    this.user = undefined;
  }
 
  @action
  public setTitle(title: string): void {
    this.title = title;
  }
}
/* Store end */
 
/* Store helpers */

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IStoreContext {
  // TODO: define this context
}

const StoreContext = React.createContext({} as TestStore);
 
export const StoreProvider = ({ children, store }): JSX.Element => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
 
/* Hook to use store in any functional component */
export const useStore = (): TestStore => React.useContext(StoreContext);
 
/* HOC to inject store to any functional or class component */
export const withStore = (Component) => (props) => {
  return <Component {...props} store={useStore()} />;
};