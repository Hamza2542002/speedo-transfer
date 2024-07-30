import { Component } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserComponent, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  user!: UserComponent;
  constructor(private readonly router: Router) {}

  routeToRegester() {
    this.router.navigate(['register']);
  }

  routToLogin() {
    this.router.navigate(['login']);
  }
}
