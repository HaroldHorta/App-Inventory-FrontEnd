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

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 27/12/2020
  *Este metodo se encarga de mostrar todos los detalles y campos que tiene cada ticket, es una vista mas
  *completa de la informacion correpondiente a cada ticket, funciona recibiendo un ID y listando los
  *datos de ese ID recibido*/
  openDetails(ticket) {
    this.dialog.open(TicketHistoryDetailsComponent, { context: { ticket: ticket } }).onClose.subscribe(() => {
    });
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 27/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 27/12/2020
*Con este metodo se puede abonar dinero o parte del precio del producto solo si el ticketStatus === 'CREDIT'
*esta en CREDIT, sino se mostrar otro icono el cual no permitira realizar ninguna accion ya que el producto
*ya esta pago*/
  openCreditCapital(ticket) {
    this.dialog.open(TicketCreditCapitalsComponent, { context: { ticket: ticket } }).onClose.subscribe(() => {
      this.ngOnInit();
    });
  }
  /*<i>[fin][]</i>
*@author [CadenaCristian]
*@since 27/12/2020*/
}
