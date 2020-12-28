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
  defaultColumns = ['size', 'kind', 'items'];
  allColumns = [this.customColumn, ...this.defaultColumns];

  orders: ResponseOrder[];
  items: RequestOrderProductItems[];
  product: ResponseProduct[];
  errores: string[];

  constructor(private serviceOrder: OrderService, private serviceProduct: ProductService, private toastrService: GeneralService) { }

  ngOnInit(): void {
    this.getOrdersList();
  }

  /*<i>[ini][]</i>
   *@author [CadenaCristian]
   *@since 27/12/2020
   *Este metodo se encarga de listar las ordenes de productos existentes*/
  getOrdersList() {
    this.serviceOrder.getOrders().subscribe(
      orders => {
        this.orders = orders;
      },
    );
  }
  /*<i>[fin][]</i>
     *@author [CadenaCristian]
     *@since 27/12/2020*/

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
}

