import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomeSelectComponent } from '../../../../shared/components/custome-select/custome-select.component';
import { Router } from '@angular/router';
import { CurrencyService } from '../../../../services/currency/currency.service';
import { CurrencyModule } from '../../../../model/currency/currency.module';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { error } from 'node:console';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, CustomeSelectComponent, ReactiveFormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  fromCurrency = 'USD';
  toCurrency = 'EGP';
  currentDate =
    new Date().toDateString().split(' ')[1] +
    ' ' +
    new Date().toDateString().split(' ')[2];
  ammount: number = 0;
  transferForm!: FormGroup;
  factor: number = 0;

  constructor(
    private readonly router: Router,
    private readonly currencuService: CurrencyService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.transferForm = this.fb.group({
      sendAmount: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      fromCurrency: [this.fromCurrency],
      receiveAmount: [
        { value: this.ammount.toFixed(2), disabled: true },
        Validators.required,
      ],
      toCurrency: [this.toCurrency],
    });
  }

  onSelectFromCurrency(currency: string) {
    this.transferForm.get('fromCurrency')?.setValue(currency);
    this.fromCurrency = currency;
  }
  onSelectToCurrency(currency: string) {
    this.transferForm.get('toCurrency')?.setValue(currency);
    this.toCurrency = currency;
  }

  getCurrency(e: Event) {
    console.log(Number((e.target as any).value));
    this.currencuService
      .getCurrencyRate(this.fromCurrency, this.toCurrency)
      .subscribe((data) => {
        this.factor = (data as any).conversion_rates[this.toCurrency];
      });
    this.ammount = Number((e.target as any).value) * this.factor;
  }

  onSubmit() {
    if (this.transferForm.valid) console.log(this.transferForm.value);
    this.router.navigate([`/moneytransfer`], {
      queryParams: {
        send: this.transferForm.get('sendAmount')?.getRawValue(),
        recieve: this.ammount.toFixed(2),
        sendCurrency: this.transferForm.get('fromCurrency')?.getRawValue(),
        recieveCurrency: this.transferForm.get('toCurrency')?.getRawValue(),
      },
    });
  }

  routeToregister() {
    this.router.navigate(['/register']);
  }
}
