import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TRANSFER_MONEY_ROUTES } from './pages/money-tranfer/money-transfer.routes';
import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { RegisterGuard } from './core/guards/register-guard/register.guard';
import { MY_ACCOUNT_ROUTES } from './pages/my-account/my-account.routes';
import { AccountGuard } from './core/guards/account-guard/account.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('../app/pages/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../app/auth/login/login.component').then((m) => m.LoginComponent),
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../app/auth/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
    pathMatch: 'full',
    canActivate: [RegisterGuard],
  },
  {
    path: 'moneytransfer',
    loadComponent: () =>
      import('../app/pages/money-tranfer/money-tranfer.component').then(
        (m) => m.MoneyTranferComponent,
      ),
    children: TRANSFER_MONEY_ROUTES,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'myaccount',
    loadComponent: () =>
      import('../app/pages/my-account/my-account.component').then(
        (m) => m.MyAccountComponent,
      ),
    children: MY_ACCOUNT_ROUTES,
    canActivate: [AccountGuard],
  },
  {
    path: 'no-profile',
    loadComponent: () =>
      import(
        '../app/pages/my-account/components/no-profile/no-profile.component'
      ).then((m) => m.NoProfileComponent),
    pathMatch: 'full',
  },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];
