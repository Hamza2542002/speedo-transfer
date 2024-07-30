import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomeSelectComponent } from './components/custome-select/custome-select.component';
import { MobileAppComponent } from './components/mobile-app/mobile-app.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    HeaderComponent,
    CustomeSelectComponent,
    MobileAppComponent,
    FooterComponent,
  ],
  exports: [HeaderComponent],
})
export class SharedModule {}
