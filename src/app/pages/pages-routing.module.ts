import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './invetoryProduct/product/product.component';
import { CustomerComponent } from './invetoryProduct/customer/customer.component';
import { InventoryComponent } from './invetoryProduct/inventory/inventory.component';
import { TicketComponent } from './invetoryProduct/ticket/ticket.component';
import { CashRegisterComponent } from './invetoryProduct/cash-register/cash-register.component';
import { ExpensesComponent } from './invetoryProduct/expenses/expenses.component';
import { CategoryComponent } from './invetoryProduct/category/categorycomponent';
import { BreedComponent } from './clinicHistory/breed/breed.component';
import { SpeciesComponent } from './clinicHistory/species/species.component';
import { PetComponent } from './clinicHistory/pet/pet.component';
import { VaccinationComponent } from './clinicHistory/vaccination/vaccination.component';
import { VeterinaryComponent } from './clinicHistory/veterinary/veterinary.component';
import { ExamClinicComponent } from './clinicHistory/exam-clinic/exam-clinic.component';
import { DiagnosticPlanComponent } from './clinicHistory/diagnostic-plan/diagnostic-plan.component';
import { ClinicHistoryComponent } from './clinicHistory/clinic-history/clinic-history.component';

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
      path: 'product',
      component: ProductComponent,
    },
    {
      path: 'ticket',
      component: TicketComponent,
    },
    {
      path: 'inventory',
      component: InventoryComponent,
    },
    {
      path: 'cashRegister',
      component: CashRegisterComponent,
    },
    {
      path: 'expenses',
      component: ExpensesComponent,
    },
    {
      path: 'breed',
      component: BreedComponent,
    },
    {
      path: 'species',
      component: SpeciesComponent,
    },
    {
      path: 'pet',
      component: PetComponent,
    },
    {
      path: 'vaccination',
      component: VaccinationComponent,
    },
    {
      path: 'veterinary',
      component: VeterinaryComponent,
    },
    {
      path: 'examclinic',
      component: ExamClinicComponent,
    },
    {
      path: 'diagnosticPlan',
      component: DiagnosticPlanComponent,
    },
    {
      path: 'clinicHistory',
      component: ClinicHistoryComponent,
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
