export interface Transaction {
  id: number;
  fromAccount: number;
  toAccount: number;
  amount: number;
  convertedAmount: number;
  transactionType: string;
  status: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
