import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const API_KEY = 'c54a0700af9b5d4584dda0d6';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;
// https://v6.exchangerate-api.com/v6/YOUR-API-KEY/latest/USD
@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  rate: number = 0;
  constructor(private readonly http: HttpClient) {}
  getCurrencyRate(from: string, to: string, ammount: number = 1) {
    return this.http.get(`${API_URL}/${from}`);
  }
}
