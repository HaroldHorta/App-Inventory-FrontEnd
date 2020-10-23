import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule, NbIconModule, NbInputModule, NbTreeGridModule  } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


import { ThemeModule } from '../theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AddOrderComponent } from './order/add/add-order/add-order.component';
import { ListOrderComponent } from './order/list/list-order/list-order.component';
import { AddTicketComponent } from './ticket/add/add-ticket/add-ticket.component';
import { ListTicketComponent } from './ticket/list/list-ticket/list-ticket.component';
import { AddUserComponent } from './user/add/add-user/add-user.component';
import { ListUserComponent } from './user/list/list-user/list-user.component';
import { ProductComponent } from './product/product.component';
import { ShowcaseComponent } from './product/showcase/showcase.component';
import { ProductThumbnailComponent } from './product/product-thumbnail/product-thumbnail.component';
import { CartComponent } from './product/cart/cart.component';
import { FiltersComponent } from './product/filters/filters.component';
import { SortFiltersComponent } from './product/sort-filters/sort-filters.component';
import { SearchBarComponent } from './product/search-bar/search-bar.component';
import { CategoryComponent } from './category/categorycomponent';
import { CustomerComponent } from './customer/customer.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbInputModule, NbTreeGridModule,
  ],
  exports: [CartComponent],
  declarations: [
    PagesComponent,
    AddOrderComponent,
    ListOrderComponent,
    AddTicketComponent,
    ListTicketComponent,
    AddUserComponent,
    ListUserComponent,
    ProductComponent,
    ShowcaseComponent,
    ProductThumbnailComponent,
    CartComponent,
    FiltersComponent,
    SortFiltersComponent,
    SearchBarComponent,
    CategoryComponent,
    CustomerComponent,
  ],
})
export class PagesModule {
}
