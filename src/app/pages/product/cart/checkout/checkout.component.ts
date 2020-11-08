import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { ResponseCustomer } from '../../../../core/models/Response/customer/ResponseCustomer.module';
import { ResponseOrder } from '../../../../core/models/Response/order/ResponseOrder.module';
import { CustomerService } from '../../../../core/services/customer.service';
import { OrderService } from '../../../../core/services/order.service';
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
  loadingLargeGroup = false;
  disabledUpdate = false;
  customer: ResponseCustomer;
  hideCustomer = false;
  hideAddCustomer = false;
  reloadOne = false;
  nroDocument: string[] = [];


  constructor(private router: ActivatedRoute, private formBuilder: FormBuilder, private orderService: OrderService,
    private customerService: CustomerService, private dialog: NbDialogService) {
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
    this.dialog.open(CreateCustomerPopupComponent).onClose.subscribe(
      nroDocument => nroDocument && this.nroDocument.push(nroDocument),
    );
  }

}
