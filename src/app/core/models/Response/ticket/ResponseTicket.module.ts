import { NgModule } from '@angular/core';
import { ResponseOrder } from '../order/ResponseOrder.module';

export class ResponseTicket {
  id: string;
  customer: string;
  order: ResponseOrder;
  createAt: string;
  ticketCost: number;
  ticketCostWithoutIVA: number;
 }
