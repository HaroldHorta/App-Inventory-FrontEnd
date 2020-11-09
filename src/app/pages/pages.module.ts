import { NgModule } from '@angular/core';
import {
  NbCardModule, NbMenuModule, NbIconModule, NbInputModule, NbTreeGridModule,
  NbTableModule, NbAccordionModule, NbListModule, NbSelectModule, NbCheckboxModule, NbSpinnerModule, NbAlertModule, NbLayoutModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


import { ThemeModule } from '../theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AddUserComponent } from './user/add/add-user/add-user.component';
import { ListUserComponent } from './user/list/list-user/list-user.component';
import { ProductComponent } from './product/product.component';
import { ShowcaseComponent } from './product/showcase/showcase.component';
import { ProductThumbnailComponent } from './product/product-thumbnail/product-thumbnail.component';
import { CartComponent } from './product/cart/cart.component';
import { SortFiltersComponent } from './product/sort-filters/sort-filters.component';
import { SearchBarComponent } from './product/search-bar/search-bar.component';
import { CategoryComponent } from './category/categorycomponent';
import { CustomerComponent } from './customer/customer.component';
import { CheckoutComponent } from './product/cart/checkout/checkout.component';
import { OrderComponent } from './order/order.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PopupComponent } from './inventory/popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCustomerPopupComponent } from './customer/create-customer-popup/create-customer-popup.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketGeneratorComponent } from './ticket/ticket-generator/ticket-generator.component';

@NgModule({
  imports: [
    NbLayoutModule,
    NbAlertModule,
    NbSpinnerModule,
    NbListModule,
    NbTableModule,
    NbAccordionModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbCardModule,
    Ng2SmartTableModule,
    NbIconModule,
    NbInputModule, NbTreeGridModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbCheckboxModule,
  ],
  exports: [CartComponent],
  declarations: [
    PagesComponent,
    AddUserComponent,
    ListUserComponent,
    ProductComponent,
    ShowcaseComponent,
    ProductThumbnailComponent,
    CartComponent,
    SortFiltersComponent,
    SearchBarComponent,
    CategoryComponent,
    CustomerComponent,
    CheckoutComponent,
    OrderComponent,
    InventoryComponent,
    PopupComponent,
    CreateCustomerPopupComponent,
    TicketComponent,
    TicketGeneratorComponent,
  ],
})
export class PagesModule {
}
