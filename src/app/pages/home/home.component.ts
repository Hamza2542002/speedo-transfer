import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HeroComponent } from './components/hero/hero.component';
import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { MobileAppComponent } from '../../shared/components/mobile-app/mobile-app.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    HeroComponent,
    GettingStartedComponent,
    MobileAppComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
