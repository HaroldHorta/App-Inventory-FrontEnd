import { NgModule } from '@angular/core';
import {
  NbCardModule, NbMenuModule, NbIconModule, NbInputModule, NbTreeGridModule,
  NbTableModule, NbAccordionModule, NbListModule, NbSelectModule, NbCheckboxModule,
  NbSpinnerModule, NbAlertModule, NbLayoutModule, NbRadioModule, NbButtonModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopDetailsComponent } from './inventory/pop-details/pop-details.component';
import { PopUpdateImageComponent } from './inventory/pop-update-image/pop-update-image.component';
import { PopUpdateUnitsComponent } from './inventory/pop-update-units/pop-update-units.component';
import { CreateCustomerPopupComponent } from './customer/create-customer-popup/create-customer-popup.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketGeneratorComponent } from './ticket/ticket-generator/ticket-generator.component';
import { HeaderTicketComponent } from './ticket/ticket-generator/header-ticket/header-ticket.component';
import { CashRegisterComponent } from './cash-register/cash-register.component';

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    NbButtonModule,
    NbRadioModule,
    FormsModule,
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
    NbTableModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
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
    PopDetailsComponent,
    PopUpdateImageComponent,
    PopUpdateUnitsComponent,
    CreateCustomerPopupComponent,
    TicketComponent,
    TicketGeneratorComponent,
    HeaderTicketComponent,
    CashRegisterComponent,

  ],
})
export class PagesModule {
}
