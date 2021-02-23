import { OrderStatus } from '../../enum/OrderStatus.enum';
import { PaymentType } from '../../enum/PaymentType.enum';
import { RequestOrderProductItems } from '../../Request/order/RequestOrderProductItems';
import { ResponseProduct } from '../product/ResponseProduct.module';

export class ResponseOrder {
  id: string;
  paymentType: PaymentType;
  orderStatus: OrderStatus;
  products: ResponseProduct;
  // List<ResponseOrderProductItemsDTO> ;
 }
