import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CustomeSelectComponent } from '../../../../shared/components/custome-select/custome-select.component';
import { Router } from '@angular/router';
import { CurrencyService } from '../../../../services/currency.service';
type Currency = {
  label: string;
  img: string;
};
@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, CustomeSelectComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  fromCurrency: Currency = {
    label: 'USD',
    img: '../../../../assets/Vectors/flags/states.svg',
  };
  toCurrency: Currency = {
    label: 'EGP',
    img: '../../../../assets/Vectors/flags/egypt.svg',
  };
  ammount: number = 0;
  currentDate =
    new Date().toDateString().split(' ')[1] +
    ' ' +
    new Date().toDateString().split(' ')[2];

  constructor(
    private readonly router: Router,
    private readonly currencuService: CurrencyService,
  ) {}

  onSelectFromCurrency(currency: Currency) {
    this.fromCurrency = currency;
  }
  onSelectToCurrency(currency: Currency) {
    this.toCurrency = currency;
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
        this.ammount =
          Number((value as any).data[this.toCurrency.label]) *
          Number((e.target as any).value);
      });
  }

  routeToMonyrTransfer() {
    this.router.navigate(['/money-transfer']);
  }
}
