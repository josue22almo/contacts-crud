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

  it("should POST TO / to create a new contact", async () => {
    const nockedRequest = nock("http://localhost:300/api/v1")
      .post("/contact")
      .reply(200);

    await createContactService.communicateSync();

    expect(nockedRequest.isDone()).toBeTruthy();
  });

  it("should return the created contact", async () => {
    nock("http://localhost:300/api/v1").post("/contact").reply(200);

    const result = await createContactService.communicateSync();

    expect(result).toBeDefined();
  });
});
