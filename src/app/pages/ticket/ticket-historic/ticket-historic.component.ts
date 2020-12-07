import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { ResponseTicket } from '../../../core/models/Response/ticket/ResponseTicket.module';
import { TicketCreditCapitalsComponent } from './ticket-credit-capitals/ticket-credit-capitals.component';
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

  openCreditCapital(ticket) {
    this.dialog.open(TicketCreditCapitalsComponent, { context: { ticket: ticket } }).onClose.subscribe(() => {
      this.ngOnInit();
    });
  }

}
