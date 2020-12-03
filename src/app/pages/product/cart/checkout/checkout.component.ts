import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { RequestAddTicket } from '../../../../core/models/Request/ticket/RequestAddTicket';
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
  idTicket: string;
  typePayment = ['CASH', 'TRANSACTION', 'CREDIT'];
  typePaymentCredit = ['CASH', 'TRANSACTION'];
  payment: string = 'CASH';
  paymentCredit: string = 'CASH';
  credit: number;
  hideCredit = false;


  constructor(private generalService: GeneralService, private activeRouter: ActivatedRoute, private router: Router,
    private formBuilder: FormBuilder, private orderService: OrderService,
    private customerService: CustomerService, private dialog: NbDialogService, private serviceTicket: TicketService) {
    this.checkOutForm = this.formBuilder.group({
      nroDocument: ['', [Validators.required]],
    });

    this.checkOutFormTicket = this.formBuilder.group({
      customerId: ['', [Validators.required]],
      order: ['', [Validators.required]],
      paymentType: ['', [Validators.required]],
      creditCapital: [''],
      creditPaymentType: [''],
    });
  }

  ngOnInit(): void {

    this.idProduct = this.activeRouter.snapshot.paramMap.get('idOrder');
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
    },
    );

  }

  openAddCustomer() {
    this.dialog.open(CreateCustomerPopupComponent);
  }

  generarTicket(ticket) {

    this.loadingLargeGroup = true;
    this.disabledUpdate = true;
    const data = [];
    this.idTicket = this.generalService.generaNss();
    data.push({
      id: this.idTicket, customerId: ticket.customerId, order: ticket.order,
      paymentType: ticket.paymentType, creditCapital: ticket.creditCapital === undefined ? 0 : ticket.creditCapital,
      creditPaymentType: ticket.creditPaymentType,
    });

    this.serviceTicket.create(JSON.stringify(data[0])).subscribe(() => {
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
      const type = 'success';
      const quote = { title: null, body: 'Ticket agregado correctamente' };
      this.generalService.showToast(type, quote.title, quote.body);
      this.router.navigate(['pages/ticket', this.idTicket]);
    },
      (err) => {
        const type = 'danger';
        const quote = { title: null, body: err.error.detailMessage };
        this.generalService.showToast(type, quote.title, quote.body);
      });
  }

  public changedValueCredit(): void {
    const credit = {
      fieldName: this.credit,
    };
    // this.formGroup.patchValue(newVal);
  }

  public changedValuePayment(): void {

    const newVal = {
      fieldName: this.payment,
    };
    if (this.payment === 'CREDIT') {
      this.hideCredit = true;
    }
    if (!(this.payment === 'CREDIT')) {
      this.hideCredit = false;
      this.credit = undefined;
    }
    // this.formGroup.patchValue(newVal);
  }

  public changedValuePaymentCredit(): void {

    const newV = {
      fieldName: this.paymentCredit,
    };
    // this.formGroup.patchValue(newVal);
  }

}
