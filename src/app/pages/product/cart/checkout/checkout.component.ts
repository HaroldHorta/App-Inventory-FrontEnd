import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ResponseCustomer } from '../../../../core/models/Response/customer/ResponseCustomer.module';
import { ResponseOrder } from '../../../../core/models/Response/order/ResponseOrder.module';
import { CustomerService } from '../../../../core/services/customer.service';
import { GeneralService } from '../../../../core/services/general.service';
import { OrderService } from '../../../../core/services/order.service';
import { TicketService } from '../../../../core/services/ticket.service';
import { CreateCustomerPopupComponent } from '../../../customer/create-customer-popup/create-customer-popup.component';

@Component({
  selector: 'ngx-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  idProduct: string;
  order: ResponseOrder;
  checkOutForm: FormGroup;
  checkOutFormTicket: FormGroup;
  loadingLargeGroup = false;
  disabledUpdate = false;
  customer: ResponseCustomer;
  hideCustomer = false;
  hideAddCustomer = false;
  reloadOne = false;
  nroDocument: string;


  constructor(private generalService: GeneralService, private router: ActivatedRoute,
    private formBuilder: FormBuilder, private orderService: OrderService,
    private customerService: CustomerService, private dialog: NbDialogService, private serviceTicket: TicketService) {
    this.checkOutForm = this.formBuilder.group({
      nroDocument: ['', [Validators.required]],
    });

    this.checkOutFormTicket = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      order: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.idProduct = this.router.snapshot.paramMap.get('idOrder');
    this.getOrder(this.idProduct);
    this.order;
  }

  getOrder(id) {
    this.orderService.getOrder(id).subscribe(data => {
      this.order = data;
    });
  }

  findByNroDocument(nroDocument) {
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    this.customerService.findCustomerByNroDocument(nroDocument.nroDocument).subscribe(data => {
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
      this.hideCustomer = true;
      this.hideAddCustomer = false;
      this.customer = data;
    }, (err) => {
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
      this.hideAddCustomer = true;
      this.hideCustomer = false;
      if (this.reloadOne) {
        window.onload = () => {
          this.reloadOne = true;
        };
      }
    },
    );

  }

  openAddCustomer() {
    this.dialog.open(CreateCustomerPopupComponent);
  }

  generarTicket(ticket) {
    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    this.serviceTicket.create(ticket).subscribe(() => {
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
      const type = 'success';
      const quote = { title: null, body: 'Ticket agregado correctamente' };
      this.generalService.showToast(type, quote.title, quote.body);
    },
    (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.generalService.showToast(type, quote.title, quote.body);
    });
  }

}
