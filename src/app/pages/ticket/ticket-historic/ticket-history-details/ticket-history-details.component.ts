import { Component, OnInit } from '@angular/core';
import { ResponseTicket } from '../../../../core/models/Response/ticket/ResponseTicket.module';

@Component({
  selector: 'ngx-ticket-history-details',
  templateUrl: './ticket-history-details.component.html',
  styleUrls: ['./ticket-history-details.component.scss'],
})
export class TicketHistoryDetailsComponent implements OnInit {

  ticket;

  constructor() { }

  ngOnInit(): void {
    this.ticket;
  }


}
