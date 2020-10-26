import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { ResponseOrder } from '../../core/models/Response/order/ResponseOrder.module';
import { RequestOrderProductItems } from '../../core/models/Request/order/RequestOrderProductItems';
import { ProductService } from '../../core/services/product.service';
import { ResponseProduct } from '../../core/models/Response/product/ResponseProduct.module';
import { GeneralService } from '../../core/services/general.service';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';

@Component({
  selector: 'ngx-list-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})

export class OrderComponent implements OnInit {

  customColumn = 'name';
  defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  orders: ResponseOrder[];
  items: RequestOrderProductItems[];
  product: ResponseProduct[];
  errores: string[];

  constructor(private serviceOrder: OrderService, private serviceProduct: ProductService, private toastrService: GeneralService) { }

  ngOnInit(): void {
    this.getOrdersList();
  }

  getOrdersList() {
    this.serviceOrder.getOrders().subscribe(
      orders => {
        this.orders = orders;
         // tslint:disable-next-line:no-console
         console.log(orders);
      },
    );
  }

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
}

/*

     orders.forEach((p, index) => {
          p.products[index].id = this.orders[index].products[index].id;
        });

this.serviceProduct.getProductByid( p.products[index].id).subscribe(product => {
  this.product = product;
   // tslint:disable-next-line:no-console
console.log('product', product);
},
(err) => {
    const type = 'danger';
    const quote = { title: null, body: err.error.detailMessage };
    this.toastrService.showToast(type, quote.title, quote.body);
});*/
