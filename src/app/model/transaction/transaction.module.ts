import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from '../user/user.module';

export interface Transaction {
  from: UserModule;
  to: UserModule;
  ammount: number;
  date: Date;
  status: string;
}
