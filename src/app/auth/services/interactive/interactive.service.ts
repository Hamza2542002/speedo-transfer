import { HostListener, Injectable, NgZone } from '@angular/core';
import { AuthStateService } from '../../../core/services/authstate/auth-state.service';
import { Router } from 'express';

@Injectable({
  providedIn: 'root',
})
export class InteractiveService {
  private timeoutDuration = 30 * 60 * 1000; // 30 minutes
  private timeoutId: any;
  constructor(
    private authService: AuthStateService,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.startWatching();
  }

  @HostListener('window:mousemove')
  @HostListener('window:keydown')
  @HostListener('window:click')
  resetTimer() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => this.logout(), this.timeoutDuration);
  }

  private startWatching() {
    this.resetTimer();
  }

  private logout() {
    console.log('loged out');
  }
}
