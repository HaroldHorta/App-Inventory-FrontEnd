import { Component, OnInit } from '@angular/core';
import { ResponseTicket } from '../../../core/models/Response/ticket/ResponseTicket.module';
import { TicketService } from '../../../core/services/ticket.service';

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
    this.ticket;
  }

  /*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 27/12/2020
  *La funcion de este metodo es mostrar la vista de hideHistory, pero tambien se encarga de esconder a
   hideConsultCustomer y hideTicketCredit*/
  hiddenHistory() {
    this.hideConsultCustomer = false;
    this.hideTicketCredit = false;
    this.hideHistory = !this.hideHistory;
  }
  /*<i>[fin][]</i>
     *@author [CadenaCristian]
     *@since 27/12/2020*/

/*<i>[ini][]</i>
  *@author [CadenaCristian]
  *@since 27/12/2020
  *Este metodo se encarga de listar todos los tickets y cargar la informacion correspondiente en cada uno de ellos, tambien realiza
  *un mapeo de datos para poder mostrar un conteo de la cantidad de productos que se realizaron por cada orden*/
  getTickets() {
    this.serviceTicket.getTickets().subscribe(
      ticket => {
        ticket.forEach(
          t => {
            const cantidad = Object.values(t.order.products).length;
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
          },
        );
      });
  }
  /*<i>[fin][]</i>
     *@author [CadenaCristian]
     *@since 27/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 27/12/2020
*La funcion de este metodo es mostrar la vista de hideConsultCustomer, pero tambien se encarga de esconder
a hideHistory y hideTicketCredit*/
  hiddenConsultCustomer() {
    this.hideConsultCustomer = !this.hideConsultCustomer;
    this.hideHistory = false;
    this.hideTicketCredit = false;
  }
  /*<i>[fin][]</i>
     *@author [CadenaCristian]
     *@since 27/12/2020*/

  /*<i>[ini][]</i>
*@author [CadenaCristian]
*@since 27/12/2020
*La funcion de este metodo es mostrar la vista de hideTicketCredit, pero tambien se encarga de
 esconder a hideConsultCustomer y hideHistory*/
  hiddenConsultCredit() {
    this.hideTicketCredit = !this.hideTicketCredit;
    this.hideHistory = false;
    this.hideConsultCustomer = false;
  }
  /*<i>[fin][]</i>
   *@author [CadenaCristian]
   *@since 27/12/2020*/
}
