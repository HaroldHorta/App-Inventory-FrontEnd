import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ResponseTicket } from '../../../../core/models/Response/ticket/ResponseTicket.module';
import { TicketService } from '../../../../core/services/ticket.service';

@Component({
  selector: 'ngx-list-ticket',
  templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.scss']
})
export class ListTicketComponent implements OnInit {

  ticket: ResponseTicket[];
  errores: string[];

  constructor(private serviceTicket: TicketService) { }

  ngOnInit(): void {
    this.getTicketsList();
  }

  getTicketsList() {
    this.serviceTicket.getTickets().subscribe(
      ticket => {
        this.ticket = ticket;
      }
    )
  }
}
