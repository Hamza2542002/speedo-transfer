import { Injectable } from '@angular/core';
import { Transaction } from '../../../model/transaction/transaction.module';
import { UserService } from '../../../services/user/user.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UserModule } from '../../../model/user/user.module';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  BASE_URL = 'http://localhost:3000/transaction';
  transaction!: Transaction;
  stepIndex = 1;
  private transferDataSubject = new BehaviorSubject<any>({
    step1: null,
    step2: null,
    step3: null,
  });
  transferData$ = this.transferDataSubject.asObservable();
  private currentStep = new BehaviorSubject<number>(1);
  currentStep$ = this.currentStep.asObservable();

  constructor(
    private userService: UserService,
    private _http: HttpClient,
  ) {}

  updateStepData(step: number, data: any) {
    const currentData = this.transferDataSubject.value;
    currentData[`step${step}`] = data;
    this.transferDataSubject.next(currentData);
  }

  getStepData(step: number) {
    return this.transferDataSubject.value[`step${step}`];
  }

  getStepIndex() {
    return this.currentStep;
  }

  setStep(step: number) {
    this.currentStep.next(step);
  }

  getAllData() {
    return this.transferDataSubject.value;
  }

  createTransaction(transaction: any) {
    return this._http.post<Transaction>(`${this.BASE_URL}/`, transaction);
  }

  getTransaction(accountId: number, transactionId: number) {
    return this._http.get<Transaction[]>(
      `${this.BASE_URL}/account/${accountId}/${transactionId}`,
    );
  }

  getAllTransactions(accountId: number) {
    // return this._http.get<Transaction[]>(
    //   `${this.BASE_URL}/account/${accountId}`,
    // );

    return this._http.get<Transaction[]>(this.BASE_URL);

    // return [
    //   {
    //     id: 1,
    //     fromAccount: 101234567,
    //     toAccount: 201234567,
    //     amount: 500.0,
    //     convertedAmount: 495.0,
    //     transactionType: 'Transfer',
    //     status: 'Completed',
    //     description: 'Payment for services rendered',
    //     createdAt: '2024-07-20T10:30:00Z',
    //     updatedAt: '2024-07-20T10:35:00Z',
    //   },
    //   {
    //     id: 2,
    //     fromAccount: 101234567,
    //     toAccount: 201234567,
    //     amount: 500.0,
    //     convertedAmount: 495.0,
    //     transactionType: 'Transfer',
    //     status: 'Completed',
    //     description: 'Payment for services rendered',
    //     createdAt: '2024-07-20T10:30:00Z',
    //     updatedAt: '2024-07-20T10:35:00Z',
    //   },
    // ];
  }
}
