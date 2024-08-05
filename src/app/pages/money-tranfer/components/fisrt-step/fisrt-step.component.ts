import { Component, OnInit } from '@angular/core';
import { CustomeSelectComponent } from '../../../../shared/components/custome-select/custome-select.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CurrencyService } from '../../../../services/currency/currency.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesComponent } from '../favorites/favorites.component';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';
import { UserService } from '../../../../services/user/user.service';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-fisrt-step',
  standalone: true,
  imports: [
    CustomeSelectComponent,
    MatIconModule,
    FavoritesComponent,
    CommonModule,
    ClickOutsideDirective,
    ReactiveFormsModule,
  ],
  templateUrl: './fisrt-step.component.html',
  styleUrl: './fisrt-step.component.scss',
})
export class FisrtStepComponent implements OnInit {
  fromCurrency = 'USD';
  toCurrency = 'EGP';
  ammount: number = 0;
  factor: number = 0;
  recipient = {
    name: '',
    account: '',
    id: 0,
  };
  showFavorites: boolean = false;
  currentDate =
    new Date().toDateString().split(' ')[1] +
    ' ' +
    new Date().toDateString().split(' ')[2];
  step1Data: any;
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly currencuService: CurrencyService,
    private route: ActivatedRoute,
    private transactionServ: TransactionService,
  ) {}

  ngOnInit(): void {
    this.step1Data = this.transactionServ.getStepData(1);
    console.log(this.step1Data);
    this.form = this.fb.group({
      fromCurrency: [this.fromCurrency, Validators.required],
      fromAmount: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      toAmount: [{ value: '', disabled: true }],
      recipientName: [this.recipient.name, Validators.required],
      toCurrency: [this.toCurrency, Validators.required],
      recipientAccount: [this.recipient.account, Validators.required],
    });

    this.route.queryParams.subscribe((params) => {
      this.form
        .get('fromAmount')
        ?.setValue(
          params['send']
            ? params['send']
            : this.step1Data
              ? this.step1Data?.fromAmount
              : '',
        );
      this.form
        .get('toAmount')
        ?.setValue(
          params['recieve']
            ? params['recieve']
            : this.step1Data
              ? this.step1Data?.toAmount
              : '',
        );
      this.form
        .get('fromCurrency')
        ?.setValue(
          params['sendCurrency']
            ? params['sendCurrency']
            : this.step1Data
              ? this.step1Data?.formCurrency
              : this.fromCurrency,
        );
      this.form
        .get('toCurrency')
        ?.setValue(
          params['recieveCurrency']
            ? params['recieveCurrency']
            : this.step1Data
              ? this.step1Data?.toCurrency
              : this.toCurrency,
        );
      this.toCurrency = params['recieveCurrency']
        ? params['recieveCurrency']
        : this.step1Data
          ? this.step1Data?.toCurrency
          : this.toCurrency;
      this.fromCurrency = params['sendCurrency']
        ? params['sendCurrency']
        : this.step1Data
          ? this.step1Data?.formCurrency
          : this.fromCurrency;
      this.ammount = params['recieve']
        ? params['recieve']
        : this.step1Data
          ? this.step1Data?.toAmount
          : 0;
    });

    this.recipient.name = this.step1Data ? this.step1Data?.recipientName : '';
    this.recipient.account = this.step1Data
      ? this.step1Data?.recipientAccount
      : '';
    this.form.get('recipientName')?.setValue(this.recipient.name);
    this.form.get('recipientAccount')?.setValue(this.recipient.account);
    this.ammount = this.step1Data ? Number(this.step1Data?.toAmount) : 0;
    this.form.get('toAmount')?.setValue(this.ammount);
    this.getCurrencyInfo();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.step1Data = {
        formCurrency: this.fromCurrency,
        toCurrency: this.toCurrency,
        toAmount: this.ammount.toFixed(2),
        fromAmount: this.form.get('fromAmount')?.value,
        recipientName: this.form.get('recipientName')?.value,
        recipientAccount: this.form.get('recipientAccount')?.value,
      };
      this.transactionServ.updateStepData(1, this.step1Data);
      this.transactionServ.setStep(2);
      this.routeToConfirmation();
    }
  }

  onSelectFromCurrency(currency: string) {
    this.fromCurrency = currency;
    this.form.get('fromCurrency')?.setValue(currency);
    this.getCurrencyInfo();
  }

  onSelectToCurrency(currency: string) {
    this.toCurrency = currency;
    this.form.get('toCurrency')?.setValue(currency);
    this.getCurrencyInfo();
  }

  getCurrencyInfo() {
    this.currencuService
      .getCurrencyRate(this.fromCurrency, this.toCurrency)
      .subscribe((data) => {
        this.factor = (data as any).conversion_rates[this.toCurrency];
        this.ammount = this.form.get('fromAmount')?.value * this.factor;
      });
  }

  getCurrency(e: Event) {
    console.log(Number((e.target as any).value));
    this.ammount = Number((e.target as any).value) * this.factor;
    console.log(this.ammount);
  }

  getRecipient(event: any) {
    this.recipient = event;
    this.form.get('recipientName')?.setValue(event.name);
    this.form.get('recipientAccount')?.setValue(event.account);
  }

  routeToConfirmation() {
    this.router.navigate(['/moneytransfer/confirmation']);
  }
}
