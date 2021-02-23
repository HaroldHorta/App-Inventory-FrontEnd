import { Component, Input, OnInit } from '@angular/core';
import { ResponseTicket } from '../../../../core/models/Response/ticket/ResponseTicket.module';

@Component({
  selector: 'ngx-ticket-consult-credit',
  templateUrl: './ticket-consult-credit.component.html',
  styleUrls: ['./ticket-consult-credit.component.scss'],
})
export class TicketConsultCreditComponent implements OnInit {


  @Input() ticket: ResponseTicket[] = [];


  constructor() { }

  ngOnInit(): void {
    this.ticket;
    this.ticket = this.ticket.filter(t => t.ticketStatus === 'CREDITO');
  }


}
