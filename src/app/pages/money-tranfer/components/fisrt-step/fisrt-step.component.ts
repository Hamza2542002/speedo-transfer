import { Component, EventEmitter, Output } from '@angular/core';
import { CustomeSelectComponent } from '../../../../shared/components/custome-select/custome-select.component';
import { CurrencyModule } from '../../../../model/currency/currency.module';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CurrencyService } from '../../../../services/currency.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FavoritesComponent } from '../favorites/favorites.component';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';

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
export class FisrtStepComponent {
  fromCurrency: CurrencyModule = {
    label: 'USD',
    img: '../../../../assets/Vectors/flags/states.svg',
  };
  toCurrency: CurrencyModule = {
    label: 'EGP',
    img: '../../../../assets/Vectors/flags/egypt.svg',
  };
  ammount: number = 0;
  factor: number = 0;
  recipient = {
    name: 'Hamza Mosaad',
    account: '123456789',
  };
  showFavorites: boolean = false;
  currentDate =
    new Date().toDateString().split(' ')[1] +
    ' ' +
    new Date().toDateString().split(' ')[2];

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private readonly currencuService: CurrencyService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fromAmount: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      toAmount: [{ value: '', disabled: true }],
      recipientName: [this.recipient.name, Validators.required],
      recipientAccount: [this.recipient.account, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      // create transaction
      this.routeToConfirmation();
      console.log(this.form.value);
    }
  }

  onSelectFromCurrency(currency: CurrencyModule) {
    this.fromCurrency = currency;
    this.form.get('fromCurrency')?.setValue(event);
    this.getCurrencyInfo();
  }

  onSelectToCurrency(currency: CurrencyModule) {
    this.toCurrency = currency;
    this.form.get('toCurrency')?.setValue(currency);
    this.getCurrencyInfo();
  }

  getCurrencyInfo() {
    this.currencuService
      .getCurrencyRate(this.fromCurrency.label, this.toCurrency.label)
      .subscribe((value) => {
        this.factor = Number((value as any).data[this.toCurrency.label]);
      });
  }

  getCurrency(e: Event) {
    console.log(Number((e.target as any).value));
    this.currencuService
      .getCurrencyRate(
        this.fromCurrency.label,
        this.toCurrency.label,
        Number((e.target as any).value),
      )
      .subscribe((value) => {
        this.factor = Number((value as any).data[this.toCurrency.label]);
        this.ammount = this.factor * Number((e.target as any).value);
        this.form.get('toAmount')?.setValue(this.ammount);
      });
  }

  getRecipient(event: any) {
    this.recipient = event;
    this.form.get('recipientName')?.setValue(this.recipient.name);
    this.form.get('recipientAccount')?.setValue(this.recipient.account);
  }

  routeToConfirmation() {
    this.router.navigate(['/moneytransfer/confirmation']);
  }
}
