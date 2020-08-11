import { ContactStore } from "../../../../../app/javascript/lib/stores/ContactsStore";
import { IContact } from "../../../../../app/javascript/lib/models/IContact";
import { IResponseError } from "../../../../../app/javascript/lib/models/IResponseError";
import { ContactService } from "../../../../../app/javascript/lib/services/contact-service/ContactsService";

describe("Contact store tests", () => {
  const contactStore = new ContactStore();

  describe(".createContact", () => {
    let result: IContact | IResponseError;
    let mockedServiceFunction: jest.Mock;
    const contactAttributes = {
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      phoneNumber: "phoneNumber",
    };

    beforeEach(async () => {
      mockedServiceFunction = ContactService.prototype.createContact = jest.fn();
      mockedServiceFunction.mockResolvedValue({
        id: "contact-id",
        attributes: contactAttributes,
      });
      result = await contactStore.createContact(contactAttributes);
    });

    it("should create a contact with the given attributes", () => {
      expect(mockedServiceFunction).toHaveBeenCalledWith(contactAttributes);
    });

    it("should return the result of the service (the created contact or the error)", () => {
      expect((result as IContact).id).toBeDefined();
    });
  });

  describe(".retrieveContacts", () => {
    let result: IContact[];
    let mockedServiceFunction: jest.Mock;
    const contactAttributes = {
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      phoneNumber: "phoneNumber",
    };

    beforeEach(async () => {
      mockedServiceFunction = ContactService.prototype.retrieveContacts = jest.fn();
      mockedServiceFunction.mockResolvedValue([
        {
          id: "contact-id",
          attributes: contactAttributes,
        },
      ]);
      result = await contactStore.retrieveContacts();
    });

    it("should retrive the contacts from the service", () => {
      expect(mockedServiceFunction).toHaveBeenCalled();
    });

    it("should update the list of contacts with the retreived contacts", () => {
      expect(result.length).toBe(1);
    });
  });

  describe(".deleteContacts", () => {
    let mockedServiceFunction: jest.Mock;
    const contact = {
      id: "contact-id",
      attributes: {
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        phoneNumber: "phoneNumber",
      },
    };

    beforeEach(async () => {
      mockedServiceFunction = ContactService.prototype.deleteContact = jest.fn();
      await contactStore.deleteContacts([
        { ...contact },
        { ...contact },
        { ...contact },
        { ...contact },
      ]);
    });
    it("should delete each given contact using the service", () => {
      expect(mockedServiceFunction).toHaveBeenCalled();
    });
  });

  describe(".updateContacts", () => {
    let mockedServiceFunction: jest.Mock;
    const contact = {
      id: "contact-id",
      attributes: {
        firstName: "firstName",
        lastName: "lastName",
        email: "email",
        phoneNumber: "phoneNumber",
      },
    };

    beforeEach(async () => {
      mockedServiceFunction = ContactService.prototype.updateContact = jest.fn();
      await contactStore.updateContact(contact.id, contact.attributes);
    });
    it("should delete each given contact using the service", () => {
      expect(mockedServiceFunction).toHaveBeenCalledWith(
        contact.id,
        contact.attributes
      );
    });
  });
});
