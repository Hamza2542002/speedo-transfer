import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent {
  constructor(private router: Router) {}

  confirm() {
    this.router.navigate(['/moneytransfer/payment']);
  }
  cancel() {
    this.router.navigate(['/moneytransfer/ammount']);
  }
}
