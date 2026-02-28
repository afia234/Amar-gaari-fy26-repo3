
import { Booking, BookingStatus, Car, User, LoanLead } from '../types';
import { MOCK_CARS } from '../constants';

// Simple in-memory storage simulation
let bookings: Booking[] = [];
let cars: Car[] = [...MOCK_CARS];
let loanLeads: LoanLead[] = [];

export const MockService = {
  getStats: () => {
    return {
      totalCars: cars.length,
      activeBookings: bookings.filter(b => b.status === BookingStatus.CONFIRMED).length,
      pendingBookings: bookings.filter(b => b.status === BookingStatus.PENDING).length,
    };
  },

  getBankStats: () => {
    return {
      totalLeads: loanLeads.length,
      pendingLeads: loanLeads.filter(l => l.status === 'Pending').length,
      approvedLeads: loanLeads.filter(l => l.status === 'Approved').length,
    };
  },

  getCars: () => Promise.resolve([...cars]),
  
  addCar: (car: Car) => {
    cars.push(car);
    return Promise.resolve(car);
  },

  createBooking: (booking: Booking) => {
    bookings.push(booking);
    return Promise.resolve(booking);
  },

  getUserBookings: (userId: string) => {
    return Promise.resolve(bookings.filter(b => b.userId === userId));
  },

  getAllBookings: () => {
    return Promise.resolve([...bookings]);
  },

  updateBookingStatus: (bookingId: string, status: BookingStatus) => {
    const idx = bookings.findIndex(b => b.id === bookingId);
    if (idx !== -1) {
      bookings[idx] = { ...bookings[idx], status };
    }
    return Promise.resolve(bookings[idx]);
  },

  // Loan Lead Methods
  createLoanLead: (lead: LoanLead) => {
    loanLeads.push(lead);
    return Promise.resolve(lead);
  },

  getLoanLeads: () => {
    return Promise.resolve([...loanLeads]);
  },

  updateLoanLeadStatus: (leadId: string, status: LoanLead['status']) => {
    const idx = loanLeads.findIndex(l => l.id === leadId);
    if (idx !== -1) {
      loanLeads[idx] = { ...loanLeads[idx], status };
    }
    return Promise.resolve(loanLeads[idx]);
  },

  login: (nid: string, name: string, phone: string): Promise<User> => {
    // Determine role based on a "secret" mock condition
    let role: User['role'] = 'user';
    if (name.toLowerCase() === 'admin') role = 'admin';
    if (name.toLowerCase() === 'bankadmin') role = 'bank_admin';

    return Promise.resolve({
      id: nid,
      nid,
      name,
      phone,
      role
    });
  }
};
