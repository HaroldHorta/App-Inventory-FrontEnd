import { Component, OnInit } from '@angular/core';
import { ResponseTicket } from '../../core/models/Response/ticket/ResponseTicket.module';
import { TicketService } from '../../core/services/ticket.service';

@Component({
  selector: 'ngx-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {

  ticket: ResponseTicket[];

  constructor(private serviceTicket: TicketService) { }


  ngOnInit(): void {
    this.getTicketsList();
  }

  getTicketsList() {
    this.serviceTicket.getTickets().subscribe(
      ticket => {
        this.ticket = ticket;
      });
  }

}
