
export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  engine: string;
  imageUrl: string;
  available: boolean;
}

export interface User {
  id: string;
  name: string;
  nid: string;
  phone: string;
  role: 'user' | 'admin' | 'bank_admin';
}

export interface TestDrivePackage {
  id: string;
  durationLabel: string;
  hours: number;
  price: number;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  carModel: string; // Denormalized for display
  date: string;
  packageId: string;
  totalPrice: number;
  extras: {
    extraPeople: number;
    mealCombos: number;
  };
  status: BookingStatus;
}

export interface LoanLead {
  id: string;
  applicantName: string;
  phone: string;
  profession: string;
  monthlyIncome: number;
  loanAmount: number;
  date: string;
  status: 'Pending' | 'Contacted' | 'Approved' | 'Rejected';
}
