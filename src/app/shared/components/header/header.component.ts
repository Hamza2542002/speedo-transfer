import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../../core/services/authstate/auth-state.service';
import { UserModule } from '../../../model/user/user.module';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [UserComponent, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean | null | undefined = null;
  showForm = false;
  constructor(
    private readonly router: Router,
    private authState: AuthStateService,
  ) {}

  ngOnInit() {
    this.authState.authState$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  routeToRegester() {
    this.router.navigate(['register']);
  }

  routToLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.authState.logout();
    this.isLoggedIn = false;
  }

  getAuthState() {
    return this.authState.getAuthState();
  }

  routToHome() {
    this.router.navigate(['/']);
  }
}
