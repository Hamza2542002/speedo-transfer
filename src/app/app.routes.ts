import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MoneyTranferComponent } from './pages/money-tranfer/money-tranfer.component';
import { TRANSFER_MONEY_ROUTES } from './pages/money-tranfer/money-transfer.routes';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { RegisterGuard } from './core/guards/register-guard/register.guard';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MY_ACCOUNT_ROUTES } from './pages/my-account/my-account.routes';
import { AccountGuard } from './core/guards/account-guard/account.guard';
import { NoProfileComponent } from './pages/my-account/components/no-profile/no-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
    canActivate: [RegisterGuard],
  },
  {
    path: 'moneytransfer',
    component: MoneyTranferComponent,
    children: TRANSFER_MONEY_ROUTES,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'myaccount',
    component: MyAccountComponent,
    children: MY_ACCOUNT_ROUTES,
    canActivate: [AccountGuard],
  },
  { path: 'no-profile', component: NoProfileComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
