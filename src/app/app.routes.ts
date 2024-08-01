import { Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MoneyTranferComponent } from './pages/money-tranfer/money-tranfer.component';
import { FisrtStepComponent } from './pages/money-tranfer/components/fisrt-step/fisrt-step.component';
import { TRANSFER_MONEY_ROUTES } from './pages/money-tranfer/money-transfer.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  {
    path: 'moneytransfer',
    component: MoneyTranferComponent,
    children: TRANSFER_MONEY_ROUTES,
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
