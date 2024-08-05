import { Injectable } from '@angular/core';
import { AccountModule } from '../../model/account/account.module';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserModule } from '../../model/user/user.module';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  BASE_URL = 'http://localhost:3000/account';
  // account!: AccountModule;
  currentAccount = new BehaviorSubject<any>(undefined);
  constructor(private _http: HttpClient) {}
  getAccount(id: number) {
    this._http
      .get<AccountModule>(`${this.BASE_URL}/${id}`)
      .subscribe((value) => {
        this.setAccount(value);
      });

    // console.log(this.account);
    // return this.account;
    // return {
    //   id: 1,
    //   accountNumber: '1234567890',
    //   balance: 10000.5,
    //   currency: 'USD',
    //   accountType: 'Checking',
    //   createdAt: '2024-01-15T10:30:00Z',
    //   updatedAt: '2024-07-20T10:35:00Z',
    //   customer: {
    //     id: 123,
    //     firstName: 'John',
    //     lastName: 'Doe',
    //     nationality: 'American',
    //     nationalityNumber: '123456789',
    //     email: 'john.doe@example.com',
    //     phoneNumber: '+1-234-567-8901',
    //     gender: 'Female',
    //     address: '123 Main St, Springfield, IL, 62701, USA',
    //     dateOfBirth: '1985-06-15',
    //     token: 'abcdef123456',
    //   },
    // };
  }
  setAccount(account: AccountModule) {
    this.currentAccount.next(account);
  }

  getCurrentAccount() {
    return this.currentAccount;
  }

  getAccountObservable() {
    return this.currentAccount.asObservable();
  }
}
