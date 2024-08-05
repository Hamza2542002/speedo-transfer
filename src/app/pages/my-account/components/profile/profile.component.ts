import { Component, OnInit } from '@angular/core';
import { UserModule } from '../../../../model/user/user.module';
import { MyAccountService } from '../../services/my-account.service';
import { AccountModule } from '../../../../model/account/account.module';
import { UserService } from '../../../../services/user/user.service';
import { AccountService } from '../../../../services/account/account.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  user!: UserModule;
  account!: AccountModule;
  constructor(
    private accountService: AccountService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getUserObservable().subscribe((user) => {
      this.user = user as UserModule;
    });

    this.accountService.getCurrentAccount().subscribe((value) => {
      this.account = value;
    });
  }
}
