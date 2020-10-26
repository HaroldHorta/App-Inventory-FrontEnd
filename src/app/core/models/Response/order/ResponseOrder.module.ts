import { PaymentType } from '../enum/PaymentType.enum';
import { OrderStatus } from '../enum/OrderStatus.enum';
import { RequestOrderProductItems } from '../../Request/order/RequestOrderProductItems';

export class ResponseOrder {
  id: string;
  paymentType: PaymentType;
  orderStatus: OrderStatus;
  products: RequestOrderProductItems;
  // List<ResponseOrderProductItemsDTO> ;
 }
