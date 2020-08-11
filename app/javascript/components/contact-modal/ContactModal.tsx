import React, { ChangeEvent } from "react";
import { ContactForm } from "../contact-form/ContactForm";
import { BaseModal } from "../base-modal/BaseModal";
import { IContactAttributes } from "../../lib/models/IContactAttributes";
import { OperationType } from "../contacts-list/ui-store/OperationType";

interface IProps {
  contactAttributes: IContactAttributes;
  handleClose: () => void;
  onSubmit: () => Promise<void>;
  onFirstNameFieldChange: (event: ChangeEvent) => void;
  onLastNameFieldChange: (event: ChangeEvent) => void;
  onEmailNameFieldChange: (event: ChangeEvent) => void;
  onPhoneNumberFieldChange: (event: ChangeEvent) => void;
  isVisible: boolean;
  isSubmitButtonDisable: boolean;
  submitAction: OperationType;
  error: string;
}

export class ContactModal extends React.Component<IProps> {
  public render(): JSX.Element {
    return (
      <BaseModal {...this.props}>
        <ContactForm {...this.props} onCancel={this.props.handleClose} />
      </BaseModal>
    );
  }
}
