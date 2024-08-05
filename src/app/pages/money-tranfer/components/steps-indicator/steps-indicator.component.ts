import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-steps-indicator',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './steps-indicator.component.html',
  styleUrl: './steps-indicator.component.scss',
})
export class StepsIndicatorComponent {
  index = 1;
  constructor(private transactionService: TransactionService) {}
  ngOnInit() {
    this.transactionService.getStepIndex().subscribe((value) => {
      this.index = value;
    });
  }
}
