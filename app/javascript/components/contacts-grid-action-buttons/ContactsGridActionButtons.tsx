/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button } from "@material-ui/core";

interface IProps {
  onCreatePress: () => void;
  onDeletePress: () => void;
  onUpdatePress: () => void;
}

export const ContatsGridActionButtons = (props: IProps): JSX.Element => {
  return (
    <div>
      <Button variant="contained" onClick={props.onCreatePress} color="primary">
        Create new contact
      </Button>

      <Button
        variant="contained"
        onClick={props.onDeletePress}
        color="secondary"
      >
        Delete selected contacts
      </Button>

      <Button variant="contained" onClick={props.onUpdatePress} color="default">
        Update contact
      </Button>
    </div>
  );
};
