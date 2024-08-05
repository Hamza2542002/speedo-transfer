import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AccountModule {
  id: number = 0;
  accountNumber!: string;
  balance!: number;
  currency!: string;
  accountType!: string;
  createdAt!: string;
  updatedAt!: string;
  customer!: UserModule;
}
