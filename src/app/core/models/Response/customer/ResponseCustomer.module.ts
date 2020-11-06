import { Status } from '../enum/Status.enum';
import { TypeDocument } from '../enum/TypeDocument';

export class ResponseCustomer {
  id: string;
  name: string;
  typeDocument: TypeDocument;
  nroDocument: string;
  email: string;
  address: string;
  phone: string;
  status: Status;
}
