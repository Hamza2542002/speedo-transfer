import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_KEY = 'fca_live_kIr9X5MzTgADAmr6FUuXDYbno06FEtdGU60z3Lwo';
const API_URL = 'https://api.freecurrencyapi.com/v1/latest';
@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private readonly http: HttpClient) {}

  getCurrencyRate(from: string, to: string, ammount: number) {
    return this.http.get(
      `${API_URL}?apikey=${API_KEY}&currencies=${to}&base_currency=${from}`,
    );
  }
}
