import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule, NbIconModule, NbInputModule, NbTreeGridModule,
   NbTableModule, NbAccordionModule, NbListModule, NbSelectModule, NbDialogModule, NbDialogRef, NbCheckboxModule  } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


import { ThemeModule } from '../theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
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
import { CheckoutComponent } from './product/cart/checkout/checkout.component';
import { OrderComponent} from './order/order.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PopupComponent } from './inventory/popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
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
    NbCheckboxModule
  ],
  exports: [CartComponent],
  declarations: [
    PagesComponent,
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
    CheckoutComponent,
    OrderComponent,
    InventoryComponent,
    PopupComponent,
    
  ],
})
export class PagesModule {
}
