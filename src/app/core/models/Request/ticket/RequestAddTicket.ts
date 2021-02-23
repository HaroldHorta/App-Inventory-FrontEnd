import { PaymentType } from '../../enum/PaymentType.enum';

export class RequestAddTicket {
    id: string;
    customerId: string;
    order: string;
    paymentType: PaymentType;
    creditCapital: number;
    creditPaymentType: PaymentType;
}
