import React from "react";
import Modal from '@material-ui/core/Modal';
import { ContactForm } from "../ContactForm/ContactForm";
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  handleClose: () => void;
  isVisible: boolean;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: 50,
    left: 50,
    alignItems: "center",
  },
}));

export function ContactModal(props: IProps): JSX.Element {
  const classes = useStyles();

  return (
    <Modal
      open={props.isVisible}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.paper}
    >
      <div className={classes.paper}>
        <ContactForm />
      </div>
    </Modal>
  );
}
