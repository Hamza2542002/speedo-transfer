import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-custome-date-input',
  standalone: true,
  imports: [MatIconModule, CommonModule, ClickOutsideDirective],
  templateUrl: './custome-date-input.component.html',
  styleUrl: './custome-date-input.component.scss',
})
export class CustomeDateInputComponent {
  @Output() selectedMonth = new EventEmitter<string>();
  @Output() selectedYear = new EventEmitter<string>();
  @Output() selectedCountry = new EventEmitter<string>();
  @Input() type = '';
  slectedMonth = 'Month';
  slectedYear = 'Year';
  slectedCountry = 'Country';
  isDropdownOpen = false;
  isMonthDropdownOpen = false;
  isYearDropdownOpen = false;

  countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'EGYPT',
  ];

  months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ];

  years = Array.from({ length: 50 }, (v, i) =>
    String(new Date().getFullYear() - i),
  );

  form = new FormGroup({
    month: new FormControl('', Validators.required),
    year: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleMonthDropdown() {
    this.isMonthDropdownOpen = !this.isMonthDropdownOpen;
  }

  toggleYearDropdown() {
    this.isYearDropdownOpen = !this.isYearDropdownOpen;
  }

  selectMonth(month: any) {
    this.form.controls['month'].setValue(month.value);
    this.selectedMonth.emit(month.value);
    this.slectedMonth = month.name;
    this.isMonthDropdownOpen = false;
  }
  selectCountry(country: string) {
    this.form.controls['country'].setValue(country);
    this.selectedCountry.emit(country);
    this.slectedCountry = country;
    this.isMonthDropdownOpen = false;
  }

  selectYear(year: string) {
    this.form.controls['year'].setValue(year);
    this.selectedYear.emit(year);
    this.slectedYear = year;
    this.isYearDropdownOpen = false;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
    this.isMonthDropdownOpen = false;
    this.isYearDropdownOpen = false;
  }
}
