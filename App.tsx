
import React, { useState } from 'react';
import { User, Car } from './types';
import { Navbar } from './components/Navbar';
import { Finance } from './pages/Finance';
import { CarCard } from './components/CarCard';
import { BookingModal } from './components/BookingModal';
import { Dashboard } from './pages/Dashboard';
import { AdminPanel } from './pages/Admin';
import { BankPortal } from './pages/BankPortal';
import { Login } from './pages/Login';
import { MOCK_CARS, PREDICTIVE_SEARCH_DATA } from './constants';
import { Search, SlidersHorizontal, MapPin, ShieldCheck, Facebook, Instagram, Linkedin, Smartphone, Store, Truck } from 'lucide-react';
import { translations } from './translations';

// Use a simple page router for SPA without React Router dependency for this specific output format
export const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [language, setLanguage] = useState<'en' | 'bn'>('bn');
  
  const t = translations[language];

  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      const filtered = PREDICTIVE_SEARCH_DATA.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Limit to 8 suggestions
      setSearchSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setSearchSuggestions([]);
    setShowSuggestions(false);
  };

  const filteredCars = MOCK_CARS.filter(car => {
    const matchesSearch = car.model.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          `${car.brand} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter ? car.brand === brandFilter : true;
    return matchesSearch && matchesBrand;
  });

  const brands = Array.from(new Set(MOCK_CARS.map(c => c.brand)));

  const handleLogin = (u: User) => {
    setUser(u);
    if (u.role === 'admin') setCurrentPage('admin');
    else if (u.role === 'bank_admin') setCurrentPage('bank-portal');
    else setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  const initiateBooking = (car: Car) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    setSelectedCar(car);
  };

  const initiateLoan = (car: Car) => {
    // Redirect to Finance page
    setCurrentPage('finance');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch(currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} t={t} />;
      
      case 'admin':
        return user?.role === 'admin' ? <AdminPanel t={t} /> : <div className="p-8 text-center text-red-500">Access Denied</div>;
      
      case 'bank-portal':
        return user?.role === 'bank_admin' ? <BankPortal t={t} /> : <div className="p-8 text-center text-red-500">Access Denied</div>;

      case 'dashboard':
        return user ? <Dashboard user={user} t={t} /> : <Login onLogin={handleLogin} t={t} />;
      
      case 'finance':
        return <Finance t={t} />;

      case 'home':
      default:
        return (
          <>
            {/* Hero Section - Green Theme */}
            <div className="bg-green-900 text-white py-12 md:py-20 px-4 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-r from-green-900 to-green-800 opacity-95"></div>
               {/* Background Pattern */}
               <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px'}}></div>
               
               <div className="max-w-7xl mx-auto relative z-10">
                 <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                   {t.hero.title} <span className="text-green-300">{t.hero.titleHighlight}</span>
                 </h1>
                 <p className="text-xl text-green-100 mb-8 max-w-2xl">
                   {t.hero.subtitle}
                 </p>
                 
                 {/* Search Bar */}
                 <div className="bg-white p-4 rounded-xl shadow-lg max-w-3xl flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 text-gray-400 h-5 w-5" />
                      <input 
                        type="text" 
                        placeholder={t.hero.searchPlaceholder} 
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        onFocus={() => { if(searchTerm) setShowSuggestions(true); }}
                      />
                      {/* Predictive Search Suggestions */}
                      {showSuggestions && searchSuggestions.length > 0 && (
                        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden max-h-60 overflow-y-auto">
                          {searchSuggestions.map((suggestion, index) => (
                            <div 
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="px-4 py-3 hover:bg-green-50 text-gray-700 cursor-pointer flex items-center gap-2 border-b border-gray-50 last:border-0"
                            >
                              <Search size={14} className="text-gray-400" />
                              <span className="text-sm font-medium">{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="w-full md:w-48 relative">
                      <select 
                        className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 appearance-none bg-white"
                        value={brandFilter}
                        onChange={(e) => setBrandFilter(e.target.value)}
                      >
                        <option value="">{t.hero.allBrands}</option>
                        {brands.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                      <SlidersHorizontal className="absolute right-3 top-3 text-gray-400 h-4 w-4 pointer-events-none" />
                    </div>
                 </div>
               </div>
            </div>

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex justify-between items-end mb-8">
                <h2 className="text-2xl font-bold text-gray-900">{t.hero.featured}</h2>
                <span className="text-sm text-gray-500">{filteredCars.length} {t.hero.carsAvailable}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCars.map(car => (
                  <CarCard key={car.id} car={car} onBook={initiateBooking} onLoan={initiateLoan} t={t} />
                ))}
              </div>

              {filteredCars.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                  <p className="text-gray-500 text-lg">{t.hero.noCars}</p>
                  <button onClick={() => {setSearchTerm(''); setBrandFilter('')}} className="mt-4 text-green-600 font-medium">{t.hero.clearFilters}</button>
                </div>
              )}
            </div>
            
            {/* Value Props */}
            <div className="bg-white border-t border-gray-100 py-16">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-4">
                   <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <MapPin />
                   </div>
                   <h3 className="font-bold text-lg mb-2">{t.hero.nationwide}</h3>
                   <p className="text-gray-500 text-sm">{t.hero.nationwideDesc}</p>
                </div>
                <div className="p-4">
                   <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <ShieldCheck />
                   </div>
                   <h3 className="font-bold text-lg mb-2">{t.hero.verified}</h3>
                   <p className="text-gray-500 text-sm">{t.hero.verifiedDesc}</p>
                </div>
                <div className="p-4">
                   <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Search />
                   </div>
                   <h3 className="font-bold text-lg mb-2">{t.hero.pricing}</h3>
                   <p className="text-gray-500 text-sm">{t.hero.pricingDesc}</p>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <footer className="bg-green-900 text-green-100 py-12 border-t border-green-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Amar Gaari</h3>
            <p className="text-green-200 opacity-80">{t.footer.rights}</p>
            <div className="flex gap-4 pt-2">
               <a href="https://web.facebook.com/mastodonmarketplace" target="_blank" rel="noreferrer" className="p-2 bg-green-800 rounded-lg hover:bg-green-700 text-white transition-colors">
                  <Facebook size={20} />
               </a>
               <a href="https://www.instagram.com/mastodon_marketplace" target="_blank" rel="noreferrer" className="p-2 bg-green-800 rounded-lg hover:bg-green-700 text-white transition-colors">
                  <Instagram size={20} />
               </a>
               <a href="https://www.linkedin.com/company/mastodonmarketplace" target="_blank" rel="noreferrer" className="p-2 bg-green-800 rounded-lg hover:bg-green-700 text-white transition-colors">
                  <Linkedin size={20} />
               </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">{t.footer.download}</h4>
            <div className="space-y-3">
              <a href="https://play.google.com/store/apps/details?id=com.mastodonbd.mastodon_marketplace&hl=en_US" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-green-100 hover:text-white transition-colors">
                 <Smartphone size={18} /> {t.footer.customer}
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.mastodon.mastodon_seller" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-green-100 hover:text-white transition-colors">
                 <Store size={18} /> {t.footer.seller}
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.mastodon.mastodon_rider" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-green-100 hover:text-white transition-colors">
                 <Truck size={18} /> {t.footer.delivery}
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-4">{t.footer.links}</h4>
            <div className="space-y-3 flex flex-col">
              <a href="https://mastodonbd.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t.footer.web}</a>
              <a href="https://mastodonbd.com/blog" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t.footer.blog}</a>
            </div>
          </div>
          
          <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-4">{t.footer.legal}</h4>
              <div className="space-y-3 flex flex-col">
                <a href="https://mastodonbd.com/terms" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t.footer.terms}</a>
                <a href="https://mastodonbd.com/privacy-policy" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t.footer.privacy}</a>
                <a href="https://mastodonbd.com/return-policy" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t.footer.return}</a>
                <a href="https://mastodonbd.com/support-policy" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">{t.footer.support}</a>
              </div>
          </div>
        </div>
      </footer>

      {selectedCar && user && (
        <BookingModal 
          car={selectedCar} 
          user={user} 
          onClose={() => setSelectedCar(null)}
          onSuccess={() => {
            setSelectedCar(null);
            setCurrentPage(user.role === 'admin' ? 'admin' : 'dashboard');
          }}
          t={t}
        />
      )}
    </div>
  );
};
