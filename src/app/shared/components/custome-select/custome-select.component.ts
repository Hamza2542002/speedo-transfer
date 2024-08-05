import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { CurrencyModule } from '../../../model/currency/currency.module';

@Component({
  selector: 'app-custome-select',
  standalone: true,
  imports: [MatIconModule, CommonModule, ClickOutsideDirective],
  templateUrl: './custome-select.component.html',
  styleUrl: './custome-select.component.scss',
})
export class CustomeSelectComponent {
  @Output() selected: EventEmitter<string> = new EventEmitter();
  @Input() default!: string;
  isDropdownOpen = false;
  selectedCurrency = 'USD';
  currencyicons = {
    USD: '../../../../assets/Vectors/flags/states.svg',
    EUR: '../../../../assets/Vectors/flags/states.svg',
    EGP: '../../../../assets/Vectors/flags/egypt.svg',
  };
  currencyIconsMap = new Map<string, string>(
    Object.entries(this.currencyicons),
  );

  currencies = ['USD', 'EUR', 'EGP'];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  selectCurrency(currency: string) {
    this.selectedCurrency = currency;
    this.selected.emit(currency);
    this.closeDropdown();
    this.toggleDropdown();
  }
}
