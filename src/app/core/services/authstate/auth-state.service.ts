import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  authState = new BehaviorSubject<boolean | null | undefined>(undefined);
  authState$ = this.authState.asObservable();
  token!: string | null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('authToken');
      this.authState.next(this.token ? true : false);
    } else {
      // this.authState = new BehaviorSubject<boolean>(false);
    }
  }

  getAuthState() {
    return this.authState;
  }

  login(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
    this.authState.next(true);
  }

  signUp() {
    this.token = null;
    this.authState.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authState.next(null);
  }

  decodeJWT(token: string) {
    const [header, payload, signature] = token.split('.');

    const decodeBase64Url = (str: string) => {
      // Replace non-url compatible chars with base64 standard chars
      str = str.replace(/-/g, '+').replace(/_/g, '/');

      // Pad out with standard base64 required padding characters
      while (str.length % 4) {
        str += '=';
      }
      // Decode the base64 string
      try {
        const decodedStr = atob(str);
        return decodedStr;
      } catch (error) {
        console.error('Base64 decode error:', error);
        return null;
      }
    };

    const headerDecodedStr = decodeBase64Url(header);
    const payloadDecodedStr = decodeBase64Url(payload);
    console.log('Decoded Header String:', headerDecodedStr);
    console.log('Decoded Payload String:', payloadDecodedStr);

    // const headerDecoded = JSON.parse(decodeBase64Url(payload) ?? '');
    const payloadDecoded = JSON.parse(decodeBase64Url(payload) ?? '');

    return {
      // header: headerDecoded,
      payload: payloadDecoded,
      signature: signature,
    };
  }
}
