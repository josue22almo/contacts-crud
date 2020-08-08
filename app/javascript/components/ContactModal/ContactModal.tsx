import React, { ChangeEvent } from "react";
import { ContactForm } from "../ContactForm/ContactForm";
import { BaseModal } from "../BaseModal/BaseModal";
import { IContractAttributes } from "../../lib/models/IContractAttributes";

interface IProps {
  contactAttributes: IContractAttributes;
  handleClose: () => void;
  onSubmit: () => Promise<void>;
  onFirstNameFieldChange: (event: ChangeEvent) => void;
  onLastNameFieldChange: (event: ChangeEvent) => void;
  onEmailNameFieldChange: (event: ChangeEvent) => void;
  onPhoneNumberFieldChange: (event: ChangeEvent) => void;
  isVisible: boolean;
}

export class ContactModal extends React.Component<IProps> {
  public render(): JSX.Element {
    return (
      <BaseModal {...this.props}>
        <ContactForm 
          {...this.props}
          onCancel={this.props.handleClose}
        />
      </BaseModal>
    );
  }
}
