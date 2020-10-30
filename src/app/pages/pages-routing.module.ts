import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListTicketComponent } from './ticket/list/list-ticket/list-ticket.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/categorycomponent';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'category',
      component: CategoryComponent,
    },
    {
      path: 'customer',
      component: CustomerComponent,
    },
    {
      path: 'order',
      component: OrderComponent,
    },
    {
      path: 'product',
      component: ProductComponent,
    },
    {
      path: 'ticket',
      component: ListTicketComponent,
    },
    {
      path: 'inventory',
      component: InventoryComponent,
    },
  ],
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
