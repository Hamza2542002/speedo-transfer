import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserModule } from '../../../../../model/user/user.module';
import { UserService } from '../../../../../services/user/user.service';
@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
})
export class ProfileSettingsComponent implements OnInit {
  profileForm!: FormGroup;
  isSubmitted: boolean = false;
  user!: UserModule;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.userService.getUserObservable().subscribe((value) => {
      this.user = value as UserModule;
    });
    this.profileForm = this.fb.group({
      userName: [
        this.user?.firstName,
        [Validators.required, Validators.minLength(2)],
      ],
      lastName: [
        this.user?.lastName,
        [Validators.required, Validators.minLength(2)],
      ],
      phone: [
        this.user?.phoneNumber,
        [Validators.required, Validators.pattern(/^\+\d{12}$/)],
      ],
      email: [this.user?.email, [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.profileForm.valid) {
      this.user.firstName = this.profileForm.get('userName')?.value;
      this.user.lastName = this.profileForm.get('lastName')?.value;
      this.user.phoneNumber = this.profileForm.get('phone')?.value;
      this.user.email = this.profileForm.get('email')?.value;
      this.userService.updateUser(this.user);
    } else {
      console.log('Form is invalid');
    }
  }
}
