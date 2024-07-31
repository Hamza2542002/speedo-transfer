import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { WarningMessageComponent } from '../warning-message/warning-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    WarningMessageComponent,
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
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      // call pai to authenticate user

      this.closeForm();
      this.loginForm.reset();
    }
    console.log(this.loginForm);
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
