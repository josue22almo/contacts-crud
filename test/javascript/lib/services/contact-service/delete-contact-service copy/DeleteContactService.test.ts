import nock from "nock";
import { DeleteContactService } from "../../../../../../app/javascript/lib/services/contact-service/delete-contact-service/DeleteContactService";

describe("Delete contact service", () => {
  const contactId = "contact-id";
  const deleteContactService = new DeleteContactService(contactId);

  let nockedRequest: nock.Scope;
  -beforeEach(() => {
    nockedRequest = nock("http://localhost:3000/api/v1")
      .delete(`/contacts/${contactId}`)
      .reply(201);
  });

  it("should DELETE to /contacts/:id to delete the given contact id", async () => {
    await deleteContactService.communicateSync();

    expect(nockedRequest.isDone()).toBeTruthy();
  });
});
