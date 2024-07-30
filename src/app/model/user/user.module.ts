import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class UserModule {
  name!: string;
  email!: string;
  phone!: string;
  image!: string;
  gender!: 'Male' | 'Female';
}
