import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthStateService } from '../../services/authstate/auth-state.service';
@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(
    private router: Router,
    private authState: AuthStateService,
  ) {}
  canActivate(): boolean {
    let isAuth: boolean = false;
    this.authState.getAuthState().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
        isAuth = false;
      } else {
        isAuth = true;
      }
    });
    return isAuth;
  }
}
