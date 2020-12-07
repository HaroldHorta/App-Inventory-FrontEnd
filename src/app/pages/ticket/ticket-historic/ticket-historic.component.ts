import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ResponseTicket } from '../../../core/models/Response/ticket/ResponseTicket.module';
import { TicketService } from '../../../core/services/ticket.service';
import { TicketHistoryDetailsComponent } from './ticket-history-details/ticket-history-details.component';

@Component({
  selector: 'ngx-ticket-historic',
  templateUrl: './ticket-historic.component.html',
  styleUrls: ['./ticket-historic.component.scss'],
})
export class TicketHistoricComponent implements OnInit {


  @Input() ticket: ResponseTicket[];


  constructor(private dialog: NbDialogService) { }

  ngOnInit(): void {
    this.ticket;
  }

  openDetails(ticket) {
    this.dialog.open(TicketHistoryDetailsComponent, { context: { ticket: ticket } }).onClose.subscribe(() => {
    });
  }

}
