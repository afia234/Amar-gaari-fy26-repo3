import React from 'react';
import { Car } from '../types';
import { Fuel, Settings, Gauge } from 'lucide-react';
import { Button } from './Button';

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
  onLoan: (car: Car) => void;
  t: any;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onBook, onLoan, t }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.imageUrl} 
          alt={car.model} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-800 shadow-sm">
          {car.year}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-4">
          <p className="text-sm font-semibold text-green-600">{car.brand}</p>
          <h3 className="text-xl font-bold text-gray-900 leading-tight">{car.model}</h3>
          <p className="text-gray-500 text-sm mt-1">{t.carCard.startingFrom} ৳{(car.price / 100000).toFixed(1)} {t.carCard.lakh}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="bg-green-50 p-2 rounded-lg text-center">
            <Fuel className="w-4 h-4 mx-auto text-green-600 mb-1" />
            <p className="text-xs font-medium text-gray-700">{car.fuelType}</p>
          </div>
          <div className="bg-green-50 p-2 rounded-lg text-center">
            <Settings className="w-4 h-4 mx-auto text-green-600 mb-1" />
            <p className="text-xs font-medium text-gray-700">{car.engine}</p>
          </div>
          <div className="bg-green-50 p-2 rounded-lg text-center">
            <Gauge className="w-4 h-4 mx-auto text-green-600 mb-1" />
            <p className="text-xs font-medium text-gray-700">{car.mileage}km</p>
          </div>
        </div>

        <div className="mt-auto flex gap-2">
           <Button variant="primary" className="flex-1" onClick={() => onBook(car)}>
            {t.carCard.bookBtn}
          </Button>
           <Button variant="info" className="flex-1" onClick={() => onLoan(car)}>
            {t.carCard.applyLoan}
          </Button>
        </div>
      </div>
    </div>
  );
};
