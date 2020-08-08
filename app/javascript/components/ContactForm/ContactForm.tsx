/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { IContractAttributes } from "../../lib/models/IContractAttributes";

interface IProps {
  contactAttributes: IContractAttributes;
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  onFirstNameFieldChange: (event: ChangeEvent) => void;
  onLastNameFieldChange: (event: ChangeEvent) => void;
  onEmailNameFieldChange: (event: ChangeEvent) => void;
  onPhoneNumberFieldChange: (event: ChangeEvent) => void;
  isSubmitButtonDisable: boolean;
}

export const ContactForm = (props: IProps): JSX.Element => {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  
  const classes = useStyles();

  return (
    <form 
      className={classes.root}
      noValidate 
      autoComplete="off">
      <div>
        <TextField 
          id="standard-required"
          error={props.contactAttributes.firstName === ""}
          required
          label="First name"
          value={props.contactAttributes.firstName}
          onChange={props.onFirstNameFieldChange} />
        <TextField 
          id="standard-required"
          required
          error={props.contactAttributes.lastName === ""}
          label="Last name"
          value={props.contactAttributes.lastName}
          onChange={props.onLastNameFieldChange} />
        <TextField 
          id="standard-required"
          required
          label="email" 
          error={props.contactAttributes.email === ""}
          value={props.contactAttributes.email}
          onChange={props.onEmailNameFieldChange} />
        <TextField 
          id="standard-required"
          required
          label="Phone number"
          error={props.contactAttributes.phoneNumber === ""}
          value={props.contactAttributes.phoneNumber}
          onChange={props.onPhoneNumberFieldChange} />
      </div>
      <div>
        <Button 
          variant="contained" 
          onClick={props.onSubmit}
          disabled={props.isSubmitButtonDisable}
          color="primary">
          Create contact
        </Button>
        <Button 
          variant="contained" 
          onClick={props.onCancel}
          color="secondary">
          Cancel
        </Button>
      </div>
    </form>
  );
}