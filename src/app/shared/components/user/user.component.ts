import { Component } from '@angular/core';
import { UserModule } from '../../../model/user/user.module';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
@Component({
  selector: 'app-user',
  imports: [MatIconModule, CommonModule, ClickOutsideDirective],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: true,
})
export class UserComponent {
  user: UserModule = {
    name: 'John Doe',
    email: '',
    phone: '',
    image: 'https://via.placeholder.com/150',
    gender: 'Male',
  };
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
