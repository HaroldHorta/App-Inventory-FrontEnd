import { NgModule } from '@angular/core';
import {
  NbCardModule, NbMenuModule, NbIconModule, NbInputModule, NbTreeGridModule,
  NbTableModule, NbAccordionModule, NbListModule, NbSelectModule, NbCheckboxModule,
  NbSpinnerModule, NbAlertModule, NbLayoutModule, NbRadioModule, NbButtonModule, NbStepperModule, NbTooltipModule, NbDatepickerModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { AddUserComponent } from './user/add/add-user/add-user.component';
import { ListUserComponent } from './user/list/list-user/list-user.component';
import { ShowcaseComponent } from './invetoryProduct/product/showcase/showcase.component';
import { ProductThumbnailComponent } from './invetoryProduct/product/product-thumbnail/product-thumbnail.component';
import { CartComponent } from './invetoryProduct/product/cart/cart.component';
import { SortFiltersComponent } from './invetoryProduct/product/sort-filters/sort-filters.component';
import { SearchBarComponent } from './invetoryProduct/product/search-bar/search-bar.component';
import { CategoryComponent } from './invetoryProduct/category/categorycomponent';
import { CustomerComponent } from './invetoryProduct/customer/customer.component';
import { CheckoutComponent } from './invetoryProduct/product/cart/checkout/checkout.component';
import { InventoryComponent } from './invetoryProduct/inventory/inventory.component';
import { PopupComponent } from './invetoryProduct/inventory/popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopDetailsComponent } from './invetoryProduct/inventory/pop-details/pop-details.component';
import { PopUpdateUnitsComponent } from './invetoryProduct/inventory/pop-update-units/pop-update-units.component';
import { CreateCustomerPopupComponent } from './invetoryProduct/customer/create-customer-popup/create-customer-popup.component';
import { TicketComponent } from './invetoryProduct/ticket/ticket.component';
import { TicketGeneratorComponent } from './invetoryProduct/ticket/ticket-generator/ticket-generator.component';
import { HeaderTicketComponent } from './invetoryProduct/ticket/ticket-generator/header-ticket/header-ticket.component';
import { CashRegisterComponent } from './invetoryProduct/cash-register/cash-register.component';

import {NgxPaginationModule} from 'ngx-pagination';
import { CashRegisterBaseComponent } from './invetoryProduct/cash-register/cash-register-base/cash-register-base.component';
import { CashRegisterDailyComponent } from './invetoryProduct/cash-register/cash-register-daily/cash-register-daily.component';
import { CashRegisterHistoricComponent } from './invetoryProduct/cash-register/cash-register-historic/cash-register-historic.component';
import { ExpensesComponent } from './invetoryProduct/expenses/expenses.component';
import { PopCreateExpensesComponent } from './invetoryProduct/expenses/pop-create-expenses/pop-create-expenses.component';
import { PopDetailsExpensesComponent } from './invetoryProduct/expenses/pop-details-expenses/pop-details-expenses.component';
import { TicketHistoricComponent } from './invetoryProduct/ticket/ticket-historic/ticket-historic.component';
import { TicketConsultCreditComponent } from './invetoryProduct/ticket/ticket-consult-credit/ticket-consult-credit.component';
import { TicketConsultCustomerComponent } from './invetoryProduct/ticket/ticket-consult-customer/ticket-consult-customer.component';
import { TicketHistoryDetailsComponent } from './invetoryProduct/ticket/ticket-historic/ticket-history-details/ticket-history-details.component';
import { TicketCreditCapitalsComponent } from './invetoryProduct/ticket/ticket-historic/ticket-credit-capitals/ticket-credit-capitals.component';
import { PaginatorComponent } from './general/paginator/paginator.component';
import { PopupAddCategoryComponent } from './invetoryProduct/category/popup-add-category/popup-add-category.component';
import { MenssageConnetionComponent } from './general/menssage-connetion/menssage-connetion.component';
import { ProductComponent } from './invetoryProduct/product/product.component';
import { BreedComponent } from './clinicHistory/breed/breed.component';
import { SpeciesComponent } from './clinicHistory/species/species.component';
import { PetComponent } from './clinicHistory/pet/pet.component';
import { PopupAddBreedComponent } from './clinicHistory/breed/popup-add-breed/popup-add-breed.component';
import { PopupAddSpeciesComponent } from './clinicHistory/species/popup-add-species/popup-add-species.component';
import { PopupAddPetComponent } from './clinicHistory/pet/popup-add-pet/popup-add-pet.component';
import { PopupDetailsPetComponent } from './clinicHistory/pet/popup-details-pet/popup-details-pet.component';
import { PopupAddVaccinationPetComponent } from './clinicHistory/pet/popup-add-vaccination-pet/popup-add-vaccination-pet.component';
import { VaccinationComponent } from './clinicHistory/vaccination/vaccination.component';
import { PopupAddVaccinationComponent } from './clinicHistory/vaccination/popup-add-vaccination/popup-add-vaccination.component';

@NgModule({
  imports: [
    NbTooltipModule,
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
    NbStepperModule,
    NbDatepickerModule.forRoot(),
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
    InventoryComponent,
    PopupComponent,
    PopDetailsComponent,
    PopUpdateUnitsComponent,
    CreateCustomerPopupComponent,
    TicketComponent,
    TicketGeneratorComponent,
    HeaderTicketComponent,
    CashRegisterComponent,
    CashRegisterBaseComponent,
    CashRegisterDailyComponent,
    CashRegisterHistoricComponent,
    ExpensesComponent,
    PopCreateExpensesComponent,
    PopDetailsExpensesComponent,
    TicketHistoricComponent,
    TicketConsultCreditComponent,
    TicketConsultCustomerComponent,
    TicketHistoryDetailsComponent,
    TicketCreditCapitalsComponent,
    PaginatorComponent,
    PopupAddCategoryComponent,
    MenssageConnetionComponent,
    BreedComponent,
    SpeciesComponent,
    PetComponent,
    PopupAddBreedComponent,
    PopupAddSpeciesComponent,
    PopupAddPetComponent,
    PopupDetailsPetComponent,
    PopupAddVaccinationPetComponent,
    VaccinationComponent,
    PopupAddVaccinationComponent,

  ],
})
export class PagesModule {
}
