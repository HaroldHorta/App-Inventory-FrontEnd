import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseOrder } from '../../../../core/models/Response/order/ResponseOrder.module';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'ngx-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  idProduct: string;
  order: ResponseOrder;
  constructor(private router: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.idProduct = this.router.snapshot.paramMap.get('idOrder');
    this.getOrder(this.idProduct);
    this.order;
  }

  getOrder(id) {
    this.orderService.getOrder(id).subscribe(data => {
      this.order = data;
      // tslint:disable-next-line:no-console
      console.log('orden que llega' , this.order);
    });
  }

}
