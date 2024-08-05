import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { UserService } from '../../../../services/user/user.service';
import { MyAccountComponent } from '../../../my-account/my-account.component';
import { MyAccountService } from '../../../my-account/services/my-account.service';
import { AccountModule } from '../../../../model/account/account.module';
import { UserModule } from '../../../../model/user/user.module';
import { AccountService } from '../../../../services/account/account.service';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnInit {
  step2Data: any;
  step1Data: any;
  account!: AccountModule;
  user!: UserModule;
  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private userService: UserService,
    private accountService: AccountService,
  ) {}
  ngOnInit() {
    this.step1Data = this.transactionService.getStepData(1);
    this.accountService.getAccountObservable().subscribe((value) => {
      this.account = value;
      console.log(value);
    });
    this.userService.getUserObservable().subscribe((user) => {
      this.user = user as UserModule;
      console.log('User updated in Profile: ', user);
    });
    if (!this.step1Data) {
      this.router.navigate(['/moneytransfer']);
    }
  }
  confirm() {
    console.log(this.step1Data);
    const body = {
      sourceAccountId: 1,
      destinationAccountId: 2,
      amount: this.step1Data.ammount,
      transactionType: 'DEPOSIT',
    };
    this.transactionService.createTransaction(body).subscribe((response) => {
      console.log(response);
      this.transactionService.setStep(3);
      this.router.navigate(['/moneytransfer/payment']);
    });
  }
  cancel() {
    this.transactionService.setStep(1);
    this.router.navigate(['/moneytransfer/ammount']);
  }
}
