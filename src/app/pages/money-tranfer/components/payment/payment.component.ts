import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  constructor(private router: Router) {}
  backHome() {
    this.router.navigate(['/home']);
  }
  addToFavorite() {
    // Add to favorite
    // from user service
  }
}
