import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserModule } from '../../../model/user/user.module';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AuthStateService } from '../../../core/services/authstate/auth-state.service';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
@Component({
  selector: 'app-user',
  imports: [MatIconModule, CommonModule, ClickOutsideDirective, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: true,
})
export class UserComponent implements OnInit {
  @Input() user: UserModule | null = null;

  isDropdownOpen = false;
  @Output() logoutEvent = new EventEmitter<boolean>();
  constructor(
    private stateService: AuthStateService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
      console.log('User updated: ', user);
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }

  logout() {
    this.stateService.logout();
  }
}
