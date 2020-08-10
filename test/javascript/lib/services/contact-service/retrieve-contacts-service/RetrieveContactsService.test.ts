import nock from "nock";
import { DeleteContactService } from "../../../../../../app/javascript/lib/services/ContactService/delete-contact-service/DeleteContactService";

describe("Retrieve contacts service", () => {
  const contactId = "contact-id";
  const retrieveContactsService = new DeleteContactService(contactId);

  let nockedRequest: nock.Scope;

  beforeEach(() => {
    nockedRequest = nock("http://localhost:3000/api/v1")
    .delete(`/contacts/${contactId}`)
    .reply(200, {
      data: []
    });
  })

  it("should DELETE to /contacts/:id to delete the given contact id", async () => {
    await retrieveContactsService.communicateSync();

    expect(nockedRequest.isDone()).toBeTruthy();
  });

  it("should return the array of contacts", async () => {
    const result = await retrieveContactsService.communicateSync();

    expect(result.length).toBeDefined();
  })
});
