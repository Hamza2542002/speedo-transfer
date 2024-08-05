import { Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ProfileSettingsComponent } from './components/settings/profile-settings/profile-settings.component';
import { NoProfileComponent } from './components/no-profile/no-profile.component';

export const MY_ACCOUNT_ROUTES: Routes = [
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'profile', pathMatch: 'full' },

  { path: 'payment-history', component: PaymentHistoryComponent },
  {
    path: 'settings',
    component: SettingsComponent,
    children: [
      {
        path: '',
        redirectTo: 'profiel',
        pathMatch: 'full',
      },
      {
        path: 'profile',
        component: ProfileSettingsComponent,
        pathMatch: 'full',
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
    ],
  },
  { path: 'change-password', redirectTo: 'settings/change-password' },
  { path: '**', component: NoProfileComponent },
];
