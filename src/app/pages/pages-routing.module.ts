import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListOrderComponent } from './order/list/list-order/list-order.component';
import { ListTicketComponent } from './ticket/list/list-ticket/list-ticket.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/categorycomponent';
import { CustomerComponent } from './customer/customer.component';

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
      component: ListOrderComponent,
    },
    {
      path: 'product',
      component: ProductComponent,
    },
    {
      path: 'ticket',
      component: ListTicketComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
