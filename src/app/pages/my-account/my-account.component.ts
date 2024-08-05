import { Component, OnInit } from '@angular/core';
import { MobileAppComponent } from '../../shared/components/mobile-app/mobile-app.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TransferHeroComponent } from '../money-tranfer/components/transfer-hero/transfer-hero.component';
import { RouterModule } from '@angular/router';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UserModule } from '../../model/user/user.module';
import { UserService } from '../../services/user/user.service';
import { MyAccountService } from './services/my-account.service';
import { AccountModule } from '../../model/account/account.module';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [
    MobileAppComponent,
    FooterComponent,
    TransferHeroComponent,
    RouterModule,
    SideBarComponent,
  ],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss',
})
export class MyAccountComponent implements OnInit {
  user!: UserModule | null;
  account!: AccountModule;
  constructor(
    private userService: UserService,
    private accountService: AccountService,
  ) {}

  ngOnInit() {
    this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
    });
    this.accountService.getAccountObservable().subscribe((account) => {
      this.account = account;
    });
  }
}
