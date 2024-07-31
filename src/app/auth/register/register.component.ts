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
  erros = {};
  showForm!: boolean;
  registerForm!: FormGroup;
  isPasswordVisible = false;
  isPasswordVisible1 = false;
  isPasswordValid = true;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      country: [''],
      day: [''],
      month: [''],
      year: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.valid && this.validatePassword()) {
      // call pai create user
      console.log('User Created');

      this.closeForm();
      this.registerForm.reset();
    }
    console.log(this.registerForm);
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

  validatePassword() {
    const value = this.registerForm.get('password')?.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[!\"?$%^&*]/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialCharacter &&
      hasMinLength;
    !passwordValid
      ? (this.errorMessage =
          'The password should be at least eight characters long. To make it stronger, use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ & )')
      : !this.confirmPassword()
        ? (this.errorMessage = "Password Dosn't Match")
        : (this.errorMessage = '');

    console.log(this.errorMessage);
    return passwordValid && this.confirmPassword();
  }

  confirmPassword() {
    return (
      this.registerForm.get('password')?.value ===
      this.registerForm.get('confirmPassword')?.value
    );
  }
}
