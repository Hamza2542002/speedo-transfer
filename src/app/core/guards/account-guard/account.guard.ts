import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthStateService } from '../../services/authstate/auth-state.service';
@Injectable({
  providedIn: 'root',
})
export class AccountGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authState: AuthStateService,
  ) {}
  canActivate(): boolean {
    let isAuth: boolean = false;
    this.authState.authState$.subscribe((auth) => {
      if (!auth) {
        this.router.navigate(['no-profile']);
        isAuth = false;
      } else {
        isAuth = true;
      }
    });
    return isAuth;
  }
  canActivateChild(): boolean {
    return this.canActivate();
  }
}
