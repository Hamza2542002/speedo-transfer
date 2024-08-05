import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserModule } from '../../model/user/user.module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  BASE_URL = 'http://localhost:3000/customer';
  private token: string | null = null;
  private currentUser = new BehaviorSubject<UserModule | null>(null); // Initialize with null or a default user object

  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('authToken');
    }
  }

  setUser(user: UserModule) {
    this.currentUser.next(user);
  }

  getUser(): UserModule | null {
    return this.currentUser.getValue(); // Use getValue() to access the current value
  }

  getUserObservable() {
    return this.currentUser.asObservable();
  }

  getCurrentUser(id: number) {
    // const headers = new HttpHeaders({
    //   Authorization: this.token ? `Token ${this.token}` : '',
    // });
    this._http
      .get<UserModule>(`${this.BASE_URL}/${id}`, {})
      .subscribe((value) => {
        this.setUser(value);
        console.log(value);
      });
    return this._http.get<UserModule>(`${this.BASE_URL}/${id}`, {});
    // this.currentUser = {
    //   id: 123,
    //   firstName: 'John',
    //   lastName: 'Doe',
    //   nationality: 'American',
    //   nationalityNumber: '123456789',
    //   email: 'john.doe@example.com',
    //   phoneNumber: '+1-234-567-8901',
    //   gender: 'Male',
    //   address: '123 Main St, Springfield, IL, 62701, USA',
    //   dateOfBirth: '1985-06-15',
    //   token: 'abcdef123456',
    // };
    // return this.currentUser;
  }

  updateUser(user: UserModule) {
    this._http
      .put<UserModule>(`${this.BASE_URL}/${user.id}`, user)
      .subscribe((updatedUser) => {
        this.setUser(updatedUser);
        console.log('User updated: ', updatedUser);
      });
  }
}
