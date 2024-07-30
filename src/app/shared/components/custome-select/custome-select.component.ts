import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
type Currency = {
  label: string;
  img: string;
};
@Component({
  selector: 'app-custome-select',
  standalone: true,
  imports: [MatIconModule, CommonModule, ClickOutsideDirective],
  templateUrl: './custome-select.component.html',
  styleUrl: './custome-select.component.scss',
})
export class CustomeSelectComponent {
  @Output() selected: EventEmitter<Currency> = new EventEmitter();
  @Input() default!: Currency;

  isDropdownOpen = false;
  selectedCurrency: Currency = {
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

  selectCurrency(currency: Currency) {
    this.selectedCurrency = currency;
    this.selected.emit(currency);
    this.closeDropdown();
    this.toggleDropdown();
  }
}
