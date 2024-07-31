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
  @Output() selected: EventEmitter<CurrencyModule> = new EventEmitter();
  @Input() default!: CurrencyModule;

  isDropdownOpen = false;
  selectedCurrency: CurrencyModule = {
    label: 'USD',
    img: '../../../../assets/Vectors/flags/states.svg',
  };

  currencies = [
    { label: 'USD', img: '../../../../assets/Vectors/flags/states.svg' },
    { label: 'EUR', img: '../../../../assets/Vectors/flags/states.svg' },
    { label: 'EGP', img: '../../../../assets/Vectors/flags/egypt.svg' },
  ];

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  selectCurrency(currency: CurrencyModule) {
    this.selectedCurrency = currency;
    this.selected.emit(currency);
    this.closeDropdown();
    this.toggleDropdown();
  }
}
