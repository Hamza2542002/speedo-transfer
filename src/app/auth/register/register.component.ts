import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomeSelectComponent } from '../../shared/components/custome-select/custome-select.component';
import { CustomeDateInputComponent } from '../../shared/components/custome-date-input/custome-date-input.component';
import { AuthService } from '../../core/services/auth.service';
import { max } from 'rxjs';
import { UserModule } from '../../model/user/user.module';
import { AuthStateService } from '../../core/services/authstate/auth-state.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CustomeSelectComponent,
    CustomeDateInputComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  showForm!: boolean;
  registerForm!: FormGroup;
  isPasswordVisible = false;
  isPasswordVisible1 = false;
  isPasswordValid = true;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private authState: AuthStateService,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      country: ['', Validators.required],
      day: [
        '',
        [
          Validators.pattern('^(0?[1-9]|[12][0-9]|3[01])$'),
          Validators.required,
        ],
      ],
      month: ['', Validators.required],
      year: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!\"?$%^&*])(?=.{8,})/,
          ),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!\"?$%^&*])(?=.{8,})/,
          ),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid) {
      const user = {
        firstName: String(this.registerForm.get('userName')?.value),
        lastName: '',
        phoneNumber: '',
        address: '',
        email: String(this.registerForm.get('email')?.value),
        nationality: String(this.registerForm.get('country')?.getRawValue()),
        nationalityNumber: '',
        dateOfBirth: `${this.registerForm.get('year')?.value}-${this.registerForm.get('month')?.value}-${this.registerForm.get('day')?.value}`,
        password: this.registerForm.get('password')?.value,
      };
      console.log(user);
      this.authService.register(user).subscribe(
        (response) => {
          console.log(response);
          console.log('User Created');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
        },
      );
      // this.router.navigate(['/login']);
      // console.log(this.registerForm);
    }
  }

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  togglePassword1() {
    this.isPasswordVisible1 = !this.isPasswordVisible1;
  }

  closeForm() {
    this.router.navigate(['home']);
    this.showForm = false;
  }

  getCountryErrorMessage() {
    const country = this.registerForm.get('country');
    country?.hasError('required') ? 'Country is required' : '';
  }

  getDayErrorMessage() {
    const day = this.registerForm.get('day');
    if (day?.hasError('required')) return 'Day is required';
    else if (day?.hasError('pattern')) return 'Day Must be between 1 and 31';
    else return '';
  }

  getMonthErrorMessage() {
    const month = this.registerForm.get('month');
    month?.hasError('required') ? 'Month is required' : '';
  }

  getYearErrorMessage() {
    const year = this.registerForm.get('year');
    year?.hasError('required') ? 'Year is required' : '';
  }

  checkPasswords() {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  getEmailErrorMessage() {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'You must enter a value';
    }
    return emailControl?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    const passwordControl = this.registerForm.get('password');
    if (passwordControl?.hasError('required')) {
      return 'You must enter a value';
    }
    return passwordControl?.hasError('pattern')
      ? 'Password must be at least 8 characters long, include upper and lower case letters, a number, and a special character.'
      : '';
  }

  getConfirmPasswordErrorMessage() {
    const confirmPasswordControl = this.registerForm.get('confirmPassword');
    const passwordControl = this.registerForm.get('password');

    return confirmPasswordControl?.value === passwordControl?.value
      ? ''
      : 'Passwords do not match';
  }
}
