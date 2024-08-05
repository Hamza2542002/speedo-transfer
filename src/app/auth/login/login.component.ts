import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WarningMessageComponent } from '../warning-message/warning-message.component';
import { AuthService } from '../../core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { AuthStateService } from '../../core/services/authstate/auth-state.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    WarningMessageComponent,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  showWarning: boolean = false;
  loginAgain: boolean = false;
  showForm!: boolean;
  loginForm!: FormGroup;
  isPasswordVisible = false;
  submitted = false;
  user = {
    name: 'Hamza',
  };
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authState: AuthStateService,
    private router: Router,
    private userSevice: UserService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  getEmailErrorMessage() {
    const emailControl = this.loginForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'You must enter a value';
    }
    return emailControl?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    const passwordControl = this.loginForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'You must enter a value';
    }
    return passwordControl?.hasError('minlength')
      ? 'Password must be at least 6 characters long'
      : '';
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      // call pai to authenticate user
      const { email, password } = this.loginForm.value;
      // this.authState.login('jjkhasdjksha');
      // this.router.navigate(['/home']);
      // this.userSevice.getCurrentUser(1);

      this.authService.login(email, password).subscribe(
        (response) => {
          console.log(response);
          const token = (response as any).token;
          const decodedToken = this.decodeJWT(token);
          console.log(decodedToken);
          this.authState.login(token);
          this.userSevice.getCurrentUser(decodedToken.payload.id);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.log(error);
        },
      );
    }
    console.log(this.loginForm);
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
  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  closeForm() {
    this.router.navigate(['home']);
    this.showForm = false;
  }

  closeWarning(e: boolean) {
    this.showWarning = e;
  }
}
