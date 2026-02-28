import React, { useEffect, useState } from 'react';
import { User, Booking, BookingStatus } from '../types';
import { MockService } from '../services/mockService';
import { Clock, CheckCircle, Car } from 'lucide-react';

interface DashboardProps {
  user: User;
  t: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, t }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    MockService.getUserBookings(user.id).then(setBookings);
  }, [user.id]);

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
      case BookingStatus.CONFIRMED: return 'bg-green-100 text-green-800';
      case BookingStatus.COMPLETED: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: BookingStatus) => {
     switch (status) {
       case BookingStatus.PENDING: return t.dashboard.pending;
       case BookingStatus.CONFIRMED: return t.dashboard.confirmed;
       case BookingStatus.COMPLETED: return t.dashboard.completed;
       default: return status;
     }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t.dashboard.title}</h1>

      {/* User Info Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">{t.dashboard.welcome}</p>
          <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
        </div>
        <div className="flex gap-6 text-sm text-gray-600">
          <div>
            <p className="font-medium text-gray-400">{t.dashboard.nid}</p>
            <p>{user.nid}</p>
          </div>
          <div>
            <p className="font-medium text-gray-400">{t.dashboard.phone}</p>
            <p>{user.phone}</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-4">{t.dashboard.bookingsTitle}</h3>
      
      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
          <Car className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-500">{t.dashboard.noBookings}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{booking.carModel}</h4>
                  <p className="text-sm text-gray-500">Date: {booking.date}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    Pkg: {booking.packageId} | Extra People: {booking.extras.extraPeople} | Meals: {booking.extras.mealCombos}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(booking.status)}`}>
                  {getStatusLabel(booking.status)}
                </span>
                <p className="font-bold text-lg">৳{booking.totalPrice.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
