
export type Role = 'ADMIN' | 'CUSTOMER';

export interface User {
  id: string;
  name: string;
  email?: string;
  mobile: string;
  address: string;
  password?: string;
  package: string;
  mbps: number;
  price: number;
  status: 'Active' | 'Expired';
  role: Role;
}

export interface Message {
  id: string;
  from: string;
  fromName: string;
  to: string;
  text: string;
  timestamp: number;
  isAdmin: boolean;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  isUrgent: boolean;
}

export interface EntertainmentLink {
  id: string;
  type: 'Movie' | 'TV' | 'Drama';
  title: string;
  url: string;
}

export interface AppSettings {
  appName: string;
  logoUrl: string;
  helpline: string;
  address: string;
  payments: {
    bkash: string;
    nagad: string;
    rocket: string;
  };
}

export interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  amount: number;
  transactionId: string;
  timestamp: number;
  status: 'Pending' | 'Approved' | 'Rejected';
}
