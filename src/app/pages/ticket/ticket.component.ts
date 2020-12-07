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
  ticket: ResponseTicket[];

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
        this.ticket = ticket;
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
