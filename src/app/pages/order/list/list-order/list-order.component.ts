import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { ResponseOrder } from '../../../../core/models/Response/order/ResponseOrder.module';

@Component({
  selector: 'ngx-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {

  orders: ResponseOrder[];
  errores: string[];

  constructor(private serviceOrder: OrderService) { }

  ngOnInit(): void {
    this.getOrdersList();
  }

  getOrdersList(){
    this.serviceOrder.getOrders().subscribe(
      orders => {
        this.orders = orders;
      }
    )
  }
}
