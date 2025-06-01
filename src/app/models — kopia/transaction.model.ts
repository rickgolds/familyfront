export interface Transaction {
  id: number;
  name: string;
  type: string;
  amount: number;
  currency: string;
  direction: 'in' | 'out';
  transactionType: 'credit' | 'debit';
  icon: string;
}
