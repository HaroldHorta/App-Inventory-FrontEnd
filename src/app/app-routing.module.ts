import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { TicketGeneratorComponent } from './pages/invetoryProduct/ticket/ticket-generator/ticket-generator.component';
import { CheckoutComponent } from './pages/invetoryProduct/product/cart/checkout/checkout.component';
import { ClinicHistoryComponent } from './pages/clinicHistory/clinic-history/clinic-history.component';
import { DetailsClinicHistoryComponent } from './pages/clinicHistory/clinic-history/details-clinic-history/details-clinic-history.component';

export const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: 'pages/checkout/:idOrder', component: CheckoutComponent },
  { path: 'pages/ticket/:idTicket', component: TicketGeneratorComponent },
  { path: 'pages/clinic-history/:idClinicHistory', component: DetailsClinicHistoryComponent },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config, )],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
