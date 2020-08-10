import nock from "nock";
import { CreateContactService } from "../../../../../../app/javascript/lib/services/ContactService/create-contact-service/CreateContactService";
import { IContact } from "../../../../../../app/javascript/lib/models/IContact";

describe("Create contact service", () => {
  const contactAttributes = {
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    phoneNumber: "phoneNumber",
  };
  const createContactService = new CreateContactService(contactAttributes);

  const nockRequest = (status = 200, data?: IContact) => {
    return nock("http://localhost:3000/api/v1")
      .post("/contacts")
      .reply(status, {
        data,
      });
  };

  it("should POST TO /contacts to create a new contact", async () => {
    const nockedRequest = nockRequest(200, {
      id: "created-contact-id",
      attributes: contactAttributes,
    });
    await createContactService.communicateSync();

    expect(nockedRequest.isDone()).toBeTruthy();
  });

  it("should return the created contact", async () => {
    nockRequest(200, {
      id: "created-contact-id",
      attributes: contactAttributes,
    });
    const result = await createContactService.communicateSync();

    expect(result).toBeDefined();
  });

  it("should return an error when the email is repeated", async () => {
    nockRequest(403);

    const result = await createContactService.communicateSync();

    expect(result.error).toBeDefined();
  });
});
