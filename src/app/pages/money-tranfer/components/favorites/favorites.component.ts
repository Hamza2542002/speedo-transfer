import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  @Input() favorites: any[] = [
    {
      name: 'Hamza Mosaad',
      account: '0000000000',
    },
    {
      name: 'Asmaa Dosuky',
      account: '123456789',
    },
    {
      name: 'Hamza Mosaad',
      account: '0000000000',
    },
  ];
  @Output() selected = new EventEmitter<any>();
  @Output() showFav = new EventEmitter<boolean>();

  selectFavorite(favorite: any) {
    this.selected.emit(favorite);
    this.showFav.emit(false);
  }
}
