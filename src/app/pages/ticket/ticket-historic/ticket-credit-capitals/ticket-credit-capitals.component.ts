import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { GeneralService } from '../../../../core/services/general.service';
import { TicketService } from '../../../../core/services/ticket.service';

@Component({
  selector: 'ngx-ticket-credit-capitals',
  templateUrl: './ticket-credit-capitals.component.html',
  styleUrls: ['./ticket-credit-capitals.component.scss'],
})
export class TicketCreditCapitalsComponent implements OnInit {

  ticket;
  checkOutForm: FormGroup;
  typePayment = ['CASH', 'TRANSACTION'];
  payment: string = 'CASH';
  loadingLargeGroup = false;

  constructor(private formBuilder: FormBuilder, private ticketService: TicketService,
    private generalService: GeneralService, protected ref: NbDialogRef<TicketCreditCapitalsComponent>) {
    this.checkOutForm = this.formBuilder.group({
      idTicket: ['', [Validators.required]],
      creditCapital: ['', [Validators.required]],
      creditPayment: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.ticket;
  }

  public changedValuePayment(): void {
    const newVal = {
      fieldName: this.payment,
    };
  }

  saveCredit(ticket) {
    this.ticketService.creditCapital(ticket.idTicket, ticket.creditCapital, ticket.creditPayment).subscribe(() => {
      this.ref.close();
      this.loadingLargeGroup = false;
      const type = 'success';
      const quote = { title: null, body: 'Guardado exitoso' };
      this.generalService.showToast(type, quote.title, quote.body);

    },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.generalService.showToast(type, quote.title, quote.body);
      });
  }
}

