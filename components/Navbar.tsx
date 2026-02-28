
import React, { useState } from 'react';
import { LogOut, Car as CarIcon, Globe, ChevronDown, ExternalLink, Menu, X } from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  user: UserType | null;
  onLogout: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  language: 'en' | 'bn';
  setLanguage: (lang: 'en' | 'bn') => void;
  t: any;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, currentPage, onNavigate, language, setLanguage, t }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'bn' : 'en');
  };

  const CATEGORY_LINKS = [
    { key: 'all', url: 'https://mastodonbd.com/search' },
    { key: 'ev', url: 'https://mastodonbd.com/category/electric-vehicle' },
    { key: 'wash', url: 'https://mastodonbd.com/category/mastodon-wash' },
    { key: 'lube', url: 'https://mastodonbd.com/category/lubricant-filter-oil-change' },
    { key: 'tyre', url: 'https://mastodonbd.com/category/tyre-rim' },
    { key: 'light', url: 'https://mastodonbd.com/category/headlights-fog-lights-tail-lights' },
    { key: 'agro', url: 'https://mastodonbd.com/category/agricultural-vehicle' },
    { key: 'helmet', url: 'https://mastodonbd.com/category/bike-helmet' },
    { key: 'tools', url: 'https://mastodonbd.com/category/tools-accessories' },
    { key: 'gear', url: 'https://mastodonbd.com/category/bike-accessories-gear' },
    { key: 'ind', url: 'https://mastodonbd.com/category/industrial-4-wheelers-excavator-caterpillar' },
  ];

  return (
    <div className="flex flex-col w-full z-40 relative">
      {/* Top Bar - Brand Links */}
      <div className="bg-green-900 text-green-100 text-xs py-2 px-4 border-b border-green-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
             <a href="https://mastodonbd.com/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
               {t.categories.web} <ExternalLink size={10} />
             </a>
             <a href="https://mastodonbd.com/blog" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
               {t.categories.blog} <ExternalLink size={10} />
             </a>
          </div>
          <div className="flex gap-4">
             <span className="opacity-75">Mastodon Marketplace</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            
            {/* Logo & Desktop Nav */}
            <div className="flex items-center">
              <div className="flex items-center cursor-pointer mr-8" onClick={() => onNavigate('home')}>
                <CarIcon className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-gray-900 tracking-tight">Amar Gaari</span>
              </div>
              
              <div className="hidden lg:flex items-center space-x-6">
                <button 
                  onClick={() => onNavigate('home')}
                  className={`text-sm font-medium transition-colors ${currentPage === 'home' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
                >
                  {t.nav.home}
                </button>
                <button 
                  onClick={() => onNavigate('finance')}
                  className={`text-sm font-medium transition-colors ${currentPage === 'finance' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
                >
                  {t.nav.finance}
                </button>

                {/* Categories Dropdown */}
                <div className="relative group">
                  <button 
                    className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors py-2"
                    onMouseEnter={() => setIsCategoryOpen(true)}
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  >
                    {t.categories.label} <ChevronDown size={14} />
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div 
                    className={`absolute top-full left-0 w-64 bg-white border border-gray-100 rounded-lg shadow-xl py-2 mt-1 transition-all duration-200 transform origin-top-left ${isCategoryOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible group-hover:opacity-100 group-hover:scale-100 group-hover:visible'}`}
                    onMouseLeave={() => setIsCategoryOpen(false)}
                  >
                    {CATEGORY_LINKS.map((link) => (
                      <a 
                        key={link.key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        {t.categories[link.key]}
                      </a>
                    ))}
                  </div>
                </div>

                {user && (
                  <button 
                    onClick={() => {
                       if (user.role === 'admin') onNavigate('admin');
                       else if (user.role === 'bank_admin') onNavigate('bank-portal');
                       else onNavigate('dashboard');
                    }}
                    className={`text-sm font-medium transition-colors ${['dashboard', 'admin', 'bank-portal'].includes(currentPage) ? 'text-green-600' : 'text-gray-600 hover:text-green-600'}`}
                  >
                    {user.role === 'admin' ? t.nav.admin : user.role === 'bank_admin' ? t.nav.bankPortal : t.nav.dashboard}
                  </button>
                )}
              </div>
            </div>

            {/* Right Actions (Desktop) */}
            <div className="hidden lg:flex items-center gap-4">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-green-600 px-3 py-1.5 rounded-full border border-gray-200 hover:border-green-600 transition-all"
              >
                <Globe size={14} />
                {language === 'en' ? 'বাংলা' : 'English'}
              </button>

              {user ? (
                <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border-2 border-green-50">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 leading-none">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize mt-0.5">{user.role.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <button 
                    onClick={onLogout}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                    title={t.nav.logout}
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => onNavigate('login')}
                  className="px-5 py-2 text-sm font-bold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm hover:shadow transition-all"
                >
                  {t.nav.login}
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-sm font-medium text-gray-600"
              >
                {language === 'en' ? 'BN' : 'EN'}
              </button>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg h-[calc(100vh-4rem)] overflow-y-auto pb-20">
            <div className="px-4 py-4 space-y-4">
               {user && (
                 <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <button onClick={onLogout} className="text-xs text-red-500 font-medium">
                        {t.nav.logout}
                      </button>
                    </div>
                 </div>
               )}

               <div className="space-y-2">
                 <button onClick={() => {onNavigate('home'); setIsMobileMenuOpen(false)}} className="block w-full text-left px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700">
                   {t.nav.home}
                 </button>
                 <button onClick={() => {onNavigate('finance'); setIsMobileMenuOpen(false)}} className="block w-full text-left px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700">
                   {t.nav.finance}
                 </button>
                 {user && (
                   <button 
                    onClick={() => {
                       if (user.role === 'admin') onNavigate('admin');
                       else if (user.role === 'bank_admin') onNavigate('bank-portal');
                       else onNavigate('dashboard');
                       setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-lg font-medium text-gray-700 hover:bg-green-50 hover:text-green-700"
                   >
                     {user.role === 'admin' ? t.nav.admin : user.role === 'bank_admin' ? t.nav.bankPortal : t.nav.dashboard}
                   </button>
                 )}
                 {!user && (
                    <button onClick={() => {onNavigate('login'); setIsMobileMenuOpen(false)}} className="block w-full text-left px-3 py-2 rounded-lg font-bold text-green-700 bg-green-50">
                      {t.nav.login}
                    </button>
                 )}
               </div>

               <div className="pt-4 border-t border-gray-100">
                 <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{t.categories.label}</p>
                 <div className="space-y-1">
                   {CATEGORY_LINKS.map((link) => (
                      <a 
                        key={link.key}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-2 text-sm text-gray-600 hover:text-green-700"
                      >
                        {t.categories[link.key]}
                      </a>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
