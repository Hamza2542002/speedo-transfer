import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { UserModule } from '../../../../model/user/user.module';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  changePasswordForm!: FormGroup;
  isSubmitted: boolean = false;
  user!: UserModule;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.getUserObservable().subscribe((user) => {
      this.user = user as UserModule;
      console.log('User updated in Profile: ', user);
    });

    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: [
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

  onSubmit(): void {
    this.isSubmitted = true;
    if (
      this.changePasswordForm.valid &&
      this.user?.password ===
        this.changePasswordForm.get('currentPassword')?.value &&
      this.changePasswordForm.get('currentPassword')?.value ===
        this.changePasswordForm.get('newPassword')?.value
    ) {
      this.user.password = this.changePasswordForm.get('newPassword')?.value;
      this.userService.updateUser(this.user);
    } else {
      console.log('Form is invalid');
    }
  }
}
