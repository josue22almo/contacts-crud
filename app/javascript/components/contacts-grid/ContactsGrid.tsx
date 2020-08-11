/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import { observer } from "mobx-react";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";
import { GridReadyEvent } from "ag-grid-community";
import { IContact } from "../../lib/models/IContact";

interface IProps {
  onGridReady: (event: GridReadyEvent) => void;
  columnDefs: any[];
  contacts: IContact[];
}

export const ContactsGrid = observer(
  (props: IProps): JSX.Element => {
    // public render(): JSX.Element {
    return (
      <AgGridReact
        onGridReady={props.onGridReady}
        columnDefs={props.columnDefs}
        rowData={props.contacts}
        rowSelection="multiple"
      />
    );
    // }
  }
);
