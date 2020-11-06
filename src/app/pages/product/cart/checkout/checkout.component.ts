import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResponseCustomer } from '../../../../core/models/Response/customer/ResponseCustomer.module';
import { ResponseOrder } from '../../../../core/models/Response/order/ResponseOrder.module';
import { CustomerService } from '../../../../core/services/customer.service';
import { GeneralService } from '../../../../core/services/general.service';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'ngx-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  idProduct: string;
  order: ResponseOrder;
  checkOutForm: FormGroup;
  loadingLargeGroup = false;
  disabledUpdate = false;
  customer: ResponseCustomer;
  hideCustomer = false;
  hideAddCustomer = false;


  constructor(private router: ActivatedRoute, private formBuilder: FormBuilder, private orderService: OrderService,
    private customerService: CustomerService, private generalService: GeneralService) {
    this.checkOutForm = this.formBuilder.group({
      nroDocument: ['', [Validators.required]],
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
      // tslint:disable-next-line:no-console
      console.log('orden que llega', this.order);
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
    },
    (err) => {
      this.loadingLargeGroup = false;
      this.disabledUpdate = false;
      this.hideAddCustomer = true;
      this.hideCustomer = false;
      const type = 'danger';
      const quote = { title: null, body: err.error.detailMessage };
      this.generalService.showToast(type, quote.title, quote.body);
    });

  }

  addCustomer() {

  }

}
