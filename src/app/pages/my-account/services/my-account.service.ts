import { Injectable } from '@angular/core';
import { UserModule } from '../../../model/user/user.module';
import { AccountModule } from '../../../model/account/account.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyAccountService {
  BASE_URL = 'api/account';
  currentAccount = new BehaviorSubject<any>(undefined);
  currentUser = new BehaviorSubject<any>(undefined);
  constructor() {}

  setAccount(account: AccountModule) {
    this.currentAccount.next(account);
  }

  getAccount() {
    return this.currentAccount;
  }

  getUser() {
    return this.currentUser;
  }

  setUser(user: UserModule) {
    this.currentUser.next(user);
  }
}
