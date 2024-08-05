import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ActivatedRoute,
  RouterLinkActive,
  RouterModule,
} from '@angular/router';
@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, RouterLinkActive],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  profileForm!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern(/^\+\d{12}$/)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.profileForm.valid) {
      // Handle form submission
      console.log('Form Submitted!', this.profileForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
