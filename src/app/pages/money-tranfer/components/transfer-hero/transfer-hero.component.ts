import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transfer-hero',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './transfer-hero.component.html',
  styleUrl: './transfer-hero.component.scss',
})
export class TransferHeroComponent implements OnInit {
  @Input() message!: string;
  index = 1;
  constructor(private transactionService: TransactionService) {}
  ngOnInit() {
    console.log(this.message);
    this.transactionService.getStepIndex().subscribe((value) => {
      this.index = value;
    });
  }
}
