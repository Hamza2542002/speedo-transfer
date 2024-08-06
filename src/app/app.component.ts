import {
  Component,
  HostListener,
  inject,
  Inject,
  InjectionToken,
  NgZone,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { UserService } from './services/user/user.service';
import { AuthStateService } from './core/services/authstate/auth-state.service';
import { AccountService } from './services/account/account.service';
import { InteractiveService } from './auth/services/interactive/interactive.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SharedModule,
    HomeComponent,
    RouterModule,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'Speedo Transfer';
  logedIn = false;
  platfornId: Object = inject(PLATFORM_ID);
  constructor(
    private userService: UserService,
    private authState: AuthStateService,
    private accountService: AccountService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
  ngOnInit() {
    this.authState.authState$.subscribe((value) => {
      if (value) {
        this.resetTimer();
        this.logedIn = value;
        const id = (
          this.authState.decodeJWT(this.authState.token as string) as any
        ).payload.id;
        this.userService.getCurrentUser(id);
        this.accountService.getAccount(id);
      }
    });
  }
  private timeoutDuration = 30 * 60 * 1000;

  private timeoutId: any;

  @HostListener('document:mousemove')
  @HostListener('document:keydown')
  @HostListener('document:click')
  @HostListener('document:scroll')
  resetTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    if (this.logedIn)
      this.timeoutId = setTimeout(() => {
        this.authState.logout();
        this.router.navigate(['/login'], {
          queryParams: { timeOut: true },
        });
      }, this.timeoutDuration);
  }
}
