import { Routes } from '@angular/router';
import { FisrtStepComponent } from './components/fisrt-step/fisrt-step.component';
import { ConfirmationComponent } from './components/confirmation-step/confirmation.component';
import { PaymentComponent } from './components/payment/payment.component';

export const TRANSFER_MONEY_ROUTES: Routes = [
  { path: 'ammount', component: FisrtStepComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'payment', component: PaymentComponent },
  { path: '', redirectTo: 'ammount', pathMatch: 'full' },
  { path: '**', redirectTo: 'ammount' },
];
