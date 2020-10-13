import { PaymentType } from '../enum/PaymentType.enum';
import { OrderStatus } from '../enum/OrderStatus.enum';

export class ResponseOrder {
  id: string;
  customerId: string;
  paymentType: PaymentType;
  orderStatus: OrderStatus;
  // List<ResponseOrderProductItemsDTO> products;
 }
