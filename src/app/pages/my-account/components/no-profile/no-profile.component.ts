import { Component } from '@angular/core';
import { TransferHeroComponent } from '../../../money-tranfer/components/transfer-hero/transfer-hero.component';
import { MobileAppComponent } from '../../../../shared/components/mobile-app/mobile-app.component';
import { FooterComponent } from '../../../../shared/components/footer/footer.component';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-no-profile',
  standalone: true,
  imports: [
    TransferHeroComponent,
    MobileAppComponent,
    FooterComponent,
    RouterModule,
  ],
  templateUrl: './no-profile.component.html',
  styleUrl: './no-profile.component.scss',
})
export class NoProfileComponent {
  constructor(private router: Router) {}
  register() {
    this.router.navigate(['/register']);
  }
}
