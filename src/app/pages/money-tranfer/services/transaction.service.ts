import { Injectable } from '@angular/core';
import { Transaction } from '../../../model/transaction/transaction.module';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor() {}

  createTransaction(transaction: Transaction) {}

  getTransaction(id: number) {}
}
