import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../../../../services/user/user.service';
import { UserModule } from '../../../../model/user/user.module';

@Injectable({
  providedIn: 'root',
})
export class FavoritService {
  // favorites: any[] = [
  //   {
  //     name: 'Hamza Mosaad',
  //     account: '0000000000',
  //   },
  //   {
  //     name: 'Asmaa Dosuky',
  //     account: '123456789',
  //   },
  //   {
  //     name: 'Hamza Mosaad',
  //     account: '0000000000',
  //   },
  // ];

  BASE_API = 'http://localhost:3000/favourites';
  favourites!: any[];
  constructor(
    private _http: HttpClient,
    private userService: UserService,
  ) {}

  addFav(fav: any, id: number) {
    // this._http.post(`${this.BASE_API}/${id}`, fav);
    return this._http.post(`${this.BASE_API}/`, fav);
  }

  getFav(id: number) {
    return this._http.get<any[]>(`${this.BASE_API}`);
  }
}
