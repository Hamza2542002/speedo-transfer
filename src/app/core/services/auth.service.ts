import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import { AccountModule } from '../../model/account/account.module';
import { UserModule } from '../../model/user/user.module';
const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // loginUrl = `${API_URL}/users/login`;
  loginUrl = `${API_URL}/login`;
  registerUrl = `${API_URL}/customer`;
  constructor(private _http: HttpClient) {}

  login(email: string, password: string) {
    const user = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // return this._http.post(this.loginUrl, user, { headers });
    return this._http.get(`${this.loginUrl}`);
  }

  register(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // return this._http.post<{ account: AccountModule }>(
    //   `${API_URL}/users`,
    //   user,
    //   {
    //     headers,
    //   },
    // );
    return this._http.post<UserModule>(`${this.registerUrl}`, user);
  }
}
