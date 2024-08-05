import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { TransactionService } from '../../../money-tranfer/services/transaction.service';
import { AccountModule } from '../../../../model/account/account.module';
import { MyAccountService } from '../../services/my-account.service';
import { Transaction } from '../../../../model/transaction/transaction.module';
import { AccountService } from '../../../../services/account/account.service';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-payment-history',
  standalone: true,
  imports: [MatIconModule, ClipboardModule, CommonModule],
  templateUrl: './payment-history.component.html',
  styleUrl: './payment-history.component.scss',
})
export class PaymentHistoryComponent implements OnInit {
  account!: AccountModule;
  accountTransactions!: Transaction[];
  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
  ) {}

  ngOnInit() {
    this.accountService.getCurrentAccount().subscribe((value) => {
      this.account = value;
      console.log(value);
    });
    this.transactionService
      .getAllTransactions(this.account?.id)
      .subscribe((value) => (this.accountTransactions = value));
  }
  isCopied: { [key: number]: boolean } = {};
  copyAccountNumber(accountNumber: number, index: number) {
    this.isCopied[index] = true;
    setTimeout(() => {
      this.isCopied[index] = false;
    }, 2000);
    return String(accountNumber);
  }

  message(num: number) {
    return String(num);
  }
}
