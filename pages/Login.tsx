
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { MockService } from '../services/mockService';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  t: any;
}

export const Login: React.FC<LoginProps> = ({ onLogin, t }) => {
  const [formData, setFormData] = useState({ nid: '', name: '', phone: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.nid || !formData.name || !formData.phone) {
      setError('Invalid credentials'); // Generic error message
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      setTimeout(async () => {
        const user = await MockService.login(formData.nid, formData.name, formData.phone);
        onLogin(user);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Login failed');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t.login.title}</h1>
          <p className="text-sm text-gray-500 mt-2">{t.login.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.login.nameLabel}</label>
            <input 
              type="text" 
              placeholder="Enter 'Admin' or 'BankAdmin'"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.login.nidLabel}</label>
            <input 
              type="text" 
              placeholder="National ID"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.nid}
              onChange={(e) => setFormData({...formData, nid: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t.login.phoneLabel}</label>
            <input 
              type="tel" 
              placeholder="017..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {t.login.submit}
          </Button>
        </form>
        <p className="text-xs text-gray-400 text-center mt-6">
          {t.login.demo}
        </p>
      </div>
    </div>
  );
};
