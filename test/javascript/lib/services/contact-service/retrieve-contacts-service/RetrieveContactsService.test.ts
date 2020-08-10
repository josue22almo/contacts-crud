import nock from "nock";
import { RetrieveContactsService } from "../../../../../../app/javascript/lib/services/ContactService/retrieve-contacts-service/GetContactsService";

describe("Retrieve contacts service", () => {
  const retrieveContactsService = new RetrieveContactsService();

  let nockedRequest: nock.Scope;

  beforeEach(() => {
    nockedRequest = nock("http://localhost:3000/api/v1")
      .get(`/contacts`)
      .reply(200, {
        data: [],
      });
  });

  it("should do a GET to /contacts to fetch the existen contacts", async () => {
    await retrieveContactsService.communicateSync();

    expect(nockedRequest.isDone()).toBeTruthy();
  });

  it("should return the array of contacts", async () => {
    const result = await retrieveContactsService.communicateSync();

    expect(result.length).toBeDefined();
  });
});
