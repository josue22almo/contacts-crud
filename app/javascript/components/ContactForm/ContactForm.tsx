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
          required
          label="First name"
          value={props.contactAttributes.firstName}
          onChange={props.onFirstNameFieldChange} />
        <TextField 
          id="standard-required"
          required
          label="Last name"
          value={props.contactAttributes.firstName}
          onChange={props.onLastNameFieldChange} />
        <TextField 
          id="standard-required"
          required
          label="email" 
          value={props.contactAttributes.firstName}
        onChange={props.onEmailNameFieldChange} />
        <TextField 
          id="standard-required"
          required
          label="Phone number"
          value={props.contactAttributes.firstName}
          onChange={props.onPhoneNumberFieldChange} />
      </div>
      <div>
        <Button 
          variant="contained" 
          onClick={props.onSubmit}
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
