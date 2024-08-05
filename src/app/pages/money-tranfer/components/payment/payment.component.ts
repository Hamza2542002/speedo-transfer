import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { FavoritService } from '../../services/favotritsService/favorit.service';
import { UserService } from '../../../../services/user/user.service';
import { UserModule } from '../../../../model/user/user.module';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  stepDate: any;
  reciept: any;
  user!: UserModule;
  constructor(
    private router: Router,
    private transactionservice: TransactionService,
    private favouriteService: FavoritService,
    private userService: UserService,
  ) {}
  ngOnInit() {
    this.stepDate = this.transactionservice.getStepData(1);
    if (!this.stepDate) {
      this.router.navigate(['/moneytransfer']);
    }

    this.userService.getUserObservable().subscribe((user) => {
      this.user = user as UserModule;
      console.log('User updated in Profile: ', user);
    });

    this.reciept = {
      name: this.stepDate.recipientName,
      account: this.stepDate.recipientAccount,
    };
  }
  backHome() {
    this.router.navigate(['/home']);
    this.transactionservice.setStep(1);
    this.transactionservice.updateStepData(1, null);
  }
  addToFavorite() {
    this.favouriteService
      .addFav(this.reciept, this.user.id)
      .subscribe((value) => {
        console.log(value);
        this.transactionservice.setStep(1);
        this.transactionservice.updateStepData(1, null);

        this.router.navigate(['/']);
      });
  }
}
