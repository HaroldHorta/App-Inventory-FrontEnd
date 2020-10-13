import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListCategoryComponent } from './category/list/list-category/list-category.component';
import { ListCustomerComponent } from '../pages/customer/list/list-customer/list-customer.component';
import { ListOrderComponent } from './order/list/list-order/list-order.component';
import { ListTicketComponent } from './ticket/list/list-ticket/list-ticket.component';
import { ProductComponent } from './product/product.component';

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
      component: ListCategoryComponent,
    },
    {
      path: 'customer',
      component: ListCustomerComponent,
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
