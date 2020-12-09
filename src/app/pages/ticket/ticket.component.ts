import { Component, OnInit } from '@angular/core';
import { ResponseTicket } from '../../core/models/Response/ticket/ResponseTicket.module';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'ngx-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {

  hideHistory = false;
  hideConsultCustomer = false;
  hideTicketCredit = false;
  ticket: ResponseTicket[] = [];

  constructor(private serviceTicket: TicketService) { }


  ngOnInit(): void {
    this.getTickets();
  }

  hiddenHistory() {
    this.hideConsultCustomer = false;
    this.hideTicketCredit = false;
    this.hideHistory = !this.hideHistory;
  }

  getTickets() {
    this.serviceTicket.getTickets().subscribe(
      ticket => {
        ticket.forEach(
          t => {
            let cantidad = Object.values(t.order.products).length;
            this.ticket.push({
              id: t.id,
              order: t.order,
              customer: t.customer,
              createAt: t.createAt,
              paymentType: t.paymentType,
              ticketStatus: t.ticketStatus,
              creditCapitals: t.creditCapitals,
              ticketCost: t.ticketCost,
              ticketCostWithoutIVA: t.ticketCostWithoutIVA,
              outstandingBalance: t.outstandingBalance,
              cashPayment: t.cashPayment,
              transactionPayment: t.transactionPayment,
              creditPayment: t.creditPayment,
              cashRegister: t.cashRegister,
              items: cantidad,
            });
          }
        )
        console.log("este es ticket: ",this.ticket);
      });
  }

  hiddenConsultCustomer() {
    this.hideConsultCustomer = !this.hideConsultCustomer;
    this.hideHistory = false;
    this.hideTicketCredit = false;
  }

  hiddenConsultCredit() {
    this.hideTicketCredit = !this.hideTicketCredit;
    this.hideHistory = false;
    this.hideConsultCustomer = false;
  }


}
