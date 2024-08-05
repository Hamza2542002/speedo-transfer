import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FavoritService } from '../../services/favotritsService/favorit.service';
import { UserService } from '../../../../services/user/user.service';
import { AccountService } from '../../../../services/account/account.service';
import { MyAccountService } from '../../../my-account/services/my-account.service';
import { UserModule } from '../../../../model/user/user.module';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  @Output() selected = new EventEmitter<any>();
  @Output() showFav = new EventEmitter<boolean>();
  favourits: any[] = [];
  user!: UserModule | null;
  constructor(
    private favService: FavoritService,
    private userService: UserService,
  ) {}
  ngOnInit(): void {
    // Subscribe to currentUser to reactively update the view
    this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
      this.favService.getFav((user as UserModule).id).subscribe((value) => {
        this.favourits = value;
      });
      console.log('User updated in Profile: ', user);
    });
  }
  selectFavorite(favorite: any) {
    this.selected.emit(favorite);
    this.showFav.emit(false);
  }
}
