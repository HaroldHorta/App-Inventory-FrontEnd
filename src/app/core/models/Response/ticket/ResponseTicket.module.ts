import { NgModule } from '@angular/core';
import { CreditCapitals } from '../creditCapitals/creditCapitals.module';
import { ResponseCustomer } from '../customer/ResponseCustomer.module';
import { ResponseOrder } from '../order/ResponseOrder.module';

export class ResponseTicket {
  id: string;
  order: ResponseOrder;
  customer: ResponseCustomer;
  createAt: string;
  paymentType: string;
  ticketStatus: string;
  creditCapitals: CreditCapitals[];
  ticketCost: number;
  ticketCostWithoutIVA: number;
  outstandingBalance: number;
  cashPayment: number;
  transactionPayment: number;
  creditPayment: number;
  cashRegister: boolean;
  items: number;
}

