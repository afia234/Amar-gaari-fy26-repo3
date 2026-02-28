import React, { useEffect, useState } from 'react';
import { Booking, BookingStatus, Car } from '../types';
import { MockService } from '../services/mockService';
import { Button } from '../components/Button';
import { Plus } from 'lucide-react';

interface AdminPanelProps {
    t: any;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ t }) => {
  const [stats, setStats] = useState({ totalCars: 0, activeBookings: 0, pendingBookings: 0 });
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  const refreshData = async () => {
    const s = MockService.getStats();
    const b = await MockService.getAllBookings();
    setStats(s);
    setBookings(b);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: BookingStatus) => {
    await MockService.updateBookingStatus(id, newStatus);
    refreshData();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t.admin.title}</h1>
        <Button variant="primary" className="flex items-center gap-2">
          <Plus size={16} /> {t.admin.addCar}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">{t.admin.fleet}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalCars}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">{t.admin.pending}</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">{stats.pendingBookings}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-sm text-gray-500 font-medium">{t.admin.active}</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.activeBookings}</p>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="font-semibold text-gray-900">{t.admin.recent}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-medium">Booking ID</th>
                <th className="px-6 py-3 font-medium">Car Model</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-gray-500">{booking.id}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{booking.carModel}</td>
                  <td className="px-6 py-4 text-gray-600">{booking.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      booking.status === BookingStatus.CONFIRMED ? 'bg-green-100 text-green-700' :
                      booking.status === BookingStatus.PENDING ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {booking.status === BookingStatus.PENDING && (
                      <>
                        <button 
                          onClick={() => handleStatusUpdate(booking.id, BookingStatus.CONFIRMED)}
                          className="text-green-600 hover:text-green-800 font-medium text-xs"
                        >
                          {t.admin.approve}
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 font-medium text-xs"
                        >
                          {t.admin.reject}
                        </button>
                      </>
                    )}
                     {booking.status === BookingStatus.CONFIRMED && (
                        <button 
                          onClick={() => handleStatusUpdate(booking.id, BookingStatus.COMPLETED)}
                          className="text-blue-600 hover:text-blue-800 font-medium text-xs"
                        >
                          {t.admin.complete}
                        </button>
                     )}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
