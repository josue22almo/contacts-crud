import { Requester } from "./requester/Requester";
import { IContact } from "../models/IContact";
import { IContractAttributes } from "../models/IContractAttributes";

export class ContactService {
  private readonly requester: Requester;

  constructor() {
    this.requester = new Requester({
      baseURL: "http://localhost:3000/api/v1/contacts"
    });
  }

  public async getContacts(query?: Partial<IContractAttributes>): Promise<IContact[]> {
    const requestResponse = await this.requester.get<IContact[]>("/", query);
    return requestResponse.data;
  }

  public async deleteContact(id: string): Promise<void> {
    await this.requester.delete<IContact[]>(`/${id}`);
  }
}

