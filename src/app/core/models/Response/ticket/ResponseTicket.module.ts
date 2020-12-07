import { NgModule } from '@angular/core';
import { ResponseCustomer } from '../customer/ResponseCustomer.module';
import { ResponseOrder } from '../order/ResponseOrder.module';

export class ResponseTicket {
  id: string;
  customer: ResponseCustomer;
  order: ResponseOrder;
  createAt: string;
  ticketCost: number;
  ticketCostWithoutIVA: number;
  ticketStatus: string;
 }
