import { Component } from '@angular/core';
import { MobileAppComponent } from '../../shared/components/mobile-app/mobile-app.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TransferHeroComponent } from './components/transfer-hero/transfer-hero.component';
import { MainSectionComponent } from './components/main-section/main-section.component';

@Component({
  selector: 'app-money-tranfer',
  standalone: true,
  imports: [
    MobileAppComponent,
    FooterComponent,
    TransferHeroComponent,
    MainSectionComponent,
  ],
  templateUrl: './money-tranfer.component.html',
  styleUrl: './money-tranfer.component.scss',
})
export class MoneyTranferComponent {}
