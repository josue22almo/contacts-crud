import nock from "nock";
import { UpdateContactService } from "../../../../../../app/javascript/lib/services/contact-service/update-contact-service/UpdateContactService";

describe("Update contact service", () => {
  const contactAttributes = {
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    phoneNumber: "phoneNumber",
  };

  const contactId = "contact-id";

  const updateContactService = new UpdateContactService(
    contactId,
    contactAttributes
  );

  let nockedRequest: nock.Scope;

  beforeEach(() => {
    nockedRequest = nock("http://localhost:3000/api/v1")
      .patch(`/contacts/${contactId}`, contactAttributes)
      .reply(201);
  });

  it("should do a PATCH to /contacts/:id to update the given contact id with the given contact attributes", async () => {
    await updateContactService.communicateSync();

    expect(nockedRequest.isDone()).toBeTruthy();
  });
});
