import nock from "nock";
import { CreateContactService } from "../../../../../../app/javascript/lib/services/ContactService/create-contact-service/CreateContactService";

describe("Create contact service", () => {
  const contactAttributes = {
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    phoneNumber: "phoneNumber",
  };
  const createContactService = new CreateContactService(contactAttributes);

  let nockedRequest: nock.Scope;
-
  beforeEach(() => {
    nockedRequest = nock("http://localhost:3000/api/v1")
    .post("/contacts")
    .reply(200, {
      data: {
        id: "created-contact-id",
        attributes: contactAttributes
      }
    });
  })

  it("should POST TO / to create a new contact", async () => {
    await createContactService.communicateSync();

    expect(nockedRequest.isDone()).toBeTruthy();
  });

  it("should return the created contact", async () => {
    nock("http://localhost:3000/api/v1").post("/contacts").reply(200);

    const result = await createContactService.communicateSync();

    expect(result).toBeDefined();
  });
});
