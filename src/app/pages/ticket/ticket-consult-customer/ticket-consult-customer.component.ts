import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseTicket } from '../../../core/models/Response/ticket/ResponseTicket.module';
import { TicketService } from '../../../core/services/ticket.service';

@Component({
  selector: 'ngx-ticket-consult-customer',
  templateUrl: './ticket-consult-customer.component.html',
  styleUrls: ['./ticket-consult-customer.component.scss'],
})
export class TicketConsultCustomerComponent implements OnInit {

  checkOutForm: FormGroup;
  loadingLargeGroup = false;
  disabledUpdate = false;
  ticket: ResponseTicket[];
  hideNotTicket = false;
  hideTicket = false;



  constructor(private formBuilder: FormBuilder, private ticketService: TicketService) {
    this.checkOutForm = this.formBuilder.group({
      nroDocument: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  findByNroDocument(nroDocument) {
    this.ticketService.getTicketByNroDocument(nroDocument.nroDocument).subscribe(data => {
      this.hideNotTicket = false;
      this.hideTicket = true;

      this.ticket = data;
    },
      (err) => {

        this.hideNotTicket = true;
        this.hideTicket = false;


      });
  }

}
