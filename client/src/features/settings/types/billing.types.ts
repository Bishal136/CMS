export interface IPlan {
  id: string;
  name: string;
  pricePerMonth: number;
  channelsLimit: number;
}

export interface ISubscription {
  planId: string;
  status: 'active' | 'past_due' | 'canceled';
  currentPeriodEnd: string;
}

export interface IInvoice {
  id: string;
  date: string;
  amount: number;
  pdfUrl: string;
}
