import React, { useState, useEffect } from 'react';
import { X, User as UserIcon, Utensils } from 'lucide-react';
import { Car, TestDrivePackage, Booking, User, BookingStatus } from '../types';
import { TEST_DRIVE_PACKAGES, ADDON_PRICES } from '../constants';
import { Button } from './Button';
import { MockService } from '../services/mockService';

interface BookingModalProps {
  car: Car;
  user: User;
  onClose: () => void;
  onSuccess: () => void;
  t: any;
}

export const BookingModal: React.FC<BookingModalProps> = ({ car, user, onClose, onSuccess, t }) => {
  const [selectedPkg, setSelectedPkg] = useState<TestDrivePackage>(TEST_DRIVE_PACKAGES[0]);
  const [extraPeople, setExtraPeople] = useState(0);
  const [mealCombos, setMealCombos] = useState(0);
  const [date, setDate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const base = selectedPkg.price;
    const extras = (extraPeople * ADDON_PRICES.EXTRA_PERSON) + (mealCombos * ADDON_PRICES.MEAL_COMBO);
    setTotalPrice(base + extras);
  }, [selectedPkg, extraPeople, mealCombos]);

  const handleBooking = async () => {
    if (!date) return alert('Please select a date');
    setIsProcessing(true);

    // Simulate Payment Gateway Delay
    setTimeout(async () => {
      const newBooking: Booking = {
        id: `bk_${Date.now()}`,
        carId: car.id,
        userId: user.id,
        carModel: `${car.brand} ${car.model}`,
        date,
        packageId: selectedPkg.id,
        totalPrice,
        extras: {
          extraPeople,
          mealCombos,
        },
        status: BookingStatus.PENDING, // Initial status
      };

      await MockService.createBooking(newBooking);
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800">{t.booking.title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Car Summary */}
          <div className="flex gap-4 items-center">
            <img src={car.imageUrl} alt={car.model} className="w-20 h-20 object-cover rounded-lg" />
            <div>
              <p className="text-sm text-gray-500">{car.brand}</p>
              <h4 className="font-bold text-lg">{car.model}</h4>
              <p className="text-sm font-medium text-green-600">{car.year}</p>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.booking.dateLabel}</label>
            <input 
              type="date" 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {/* Packages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t.booking.pkgLabel}</label>
            <div className="grid grid-cols-3 gap-2">
              {TEST_DRIVE_PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPkg(pkg)}
                  className={`p-3 rounded-lg text-center border transition-all ${
                    selectedPkg.id === pkg.id 
                      ? 'border-green-600 bg-green-50 text-green-700 font-bold' 
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="text-sm">{pkg.durationLabel}</div>
                  <div className="text-xs mt-1">৳{pkg.price.toLocaleString()}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="space-y-4 border-t pt-4">
            <h5 className="font-semibold text-gray-700">{t.booking.addons}</h5>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <UserIcon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">{t.booking.extraPerson}</p>
                  <p className="text-xs text-gray-500">+ ৳{ADDON_PRICES.EXTRA_PERSON}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setExtraPeople(Math.max(0, extraPeople - 1))} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200">-</button>
                <span className="w-4 text-center font-medium">{extraPeople}</span>
                <button onClick={() => setExtraPeople(extraPeople + 1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200">+</button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                  <Utensils size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">{t.booking.mealCombo}</p>
                  <p className="text-xs text-gray-500">+ ৳{ADDON_PRICES.MEAL_COMBO}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setMealCombos(Math.max(0, mealCombos - 1))} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200">-</button>
                <span className="w-4 text-center font-medium">{mealCombos}</span>
                <button onClick={() => setMealCombos(mealCombos + 1)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200">+</button>
              </div>
            </div>
          </div>

          {/* Total & Action */}
          <div className="flex items-center justify-between border-t pt-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">{t.booking.total}</p>
              <p className="text-2xl font-bold text-gray-900">৳{totalPrice.toLocaleString()}</p>
            </div>
            <Button onClick={handleBooking} isLoading={isProcessing} disabled={!date}>
              {t.booking.payBtn}
            </Button>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">
            {t.booking.secureMsg}
          </p>
        </div>
      </div>
    </div>
  );
};
