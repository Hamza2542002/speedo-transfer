import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-steps-indicator',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './steps-indicator.component.html',
  styleUrl: './steps-indicator.component.scss',
})
export class StepsIndicatorComponent {
  currentStep: number = 0;
}
