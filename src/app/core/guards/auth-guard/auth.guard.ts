import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthStateService } from '../../services/authstate/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authState: AuthStateService,
    private router: Router,
  ) {}

  canActivate(): boolean {
    let isAuth: boolean = false;
    this.authState.authState$.subscribe((auth) => {
      if (!auth) {
        this.router.navigate(['/login']);
        isAuth = false;
      } else {
        isAuth = true;
      }
    });
    return isAuth;
  }

  canActivateChild(): boolean {
    let isAuth: boolean = false;
    this.authState.authState$.subscribe((auth) => {
      if (!auth) {
        this.router.navigate(['/login']);
        isAuth = false;
      } else {
        isAuth = true;
      }
    });
    return isAuth;
  }
}
