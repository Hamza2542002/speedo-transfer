import { Component, NgZone, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { UserService } from './services/user/user.service';
import { AuthStateService } from './core/services/authstate/auth-state.service';
import { AccountService } from './services/account/account.service';
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
  title = 'project';
  constructor(
    private userService: UserService,
    private authState: AuthStateService,
    private accountService: AccountService,
  ) {}
  ngOnInit() {
    this.authState.authState$.subscribe((value) => {
      if (value) {
        const id = (
          this.authState.decodeJWT(this.authState.token as string) as any
        ).payload.id;
        this.userService.getCurrentUser(id);
        this.accountService.getAccount(id);
      }
      console.log(this.authState.token);
    });
  }
}
