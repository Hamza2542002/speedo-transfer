import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { StepsIndicatorComponent } from '../steps-indicator/steps-indicator.component';
import { FisrtStepComponent } from '../fisrt-step/fisrt-step.component';

@Component({
  selector: 'app-main-section',
  standalone: true,
  imports: [
    RouterModule,
    RouterLinkActive,
    StepsIndicatorComponent,
    FisrtStepComponent,
  ],
  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.scss',
})
export class MainSectionComponent {}
