import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class UserModule {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  nationality!: string;
  nationalityNumber!: string;
  email: string = '';
  phoneNumber: string = '';
  gender: 'Male' | 'Female' = 'Male';
  address: string = '';
  dateOfBirth: string = '';
  password: string = '';
  token?: string;
  constructor() {}
}
