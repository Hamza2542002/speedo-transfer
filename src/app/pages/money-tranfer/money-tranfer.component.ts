import { Component, OnInit } from '@angular/core';
import { MobileAppComponent } from '../../shared/components/mobile-app/mobile-app.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { TransferHeroComponent } from './components/transfer-hero/transfer-hero.component';
import { MainSectionComponent } from './components/main-section/main-section.component';
import { UserService } from '../../services/user/user.service';
import { UserModule } from '../../model/user/user.module';
import { AccountService } from '../../services/account/account.service';
import { AccountModule } from '../../model/account/account.module';

@Component({
  selector: 'app-money-tranfer',
  standalone: true,
  imports: [
    MobileAppComponent,
    FooterComponent,
    TransferHeroComponent,
    MainSectionComponent,
  ],
  templateUrl: './money-tranfer.component.html',
  styleUrl: './money-tranfer.component.scss',
})
export class MoneyTranferComponent implements OnInit {
  user: UserModule | null = null;
  account: AccountModule | null = null;
  constructor(
    private userService: UserService,
    private accountservice: AccountService,
  ) {}

  ngOnInit(): void {
    // Subscribe to currentUser to reactively update the view
    this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
      console.log('User updated in Profile: ', user);
    });
    this.accountservice.getAccountObservable().subscribe((account) => {
      this.account = account;
      console.log('User updated in Profile: ', account);
    });
  }
}
