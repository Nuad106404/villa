export interface PaymentDetails {
  bookingId: string;
  totalAmount: number;
  customerName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  propertyName: string;
  expiryTime: number;
}

export interface BankAccount {
  bankName: string;
  accountName: string;
  accountNumber: string;
  branch: string;
  qrCode: string;
}