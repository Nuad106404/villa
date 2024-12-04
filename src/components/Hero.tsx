import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './search/SearchBar';
import { useSearch } from '../hooks/useSearch';
import { properties } from '../data/properties';
import SearchResults from './search/SearchResults';
import { useTranslation } from 'react-i18next';

const images = [
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920',
  'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1920',
];

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (filters: any) => {
    // Convert filters to URL parameters
    const params = new URLSearchParams();
    if (filters.location) params.set('location', filters.location);
    if (filters.guests !== 2) params.set('guests', filters.guests.toString());
    if (filters.dates?.from) params.set('checkIn', filters.dates.from.toISOString());
    if (filters.dates?.to) params.set('checkOut', filters.dates.to.toISOString());
    
    // Navigate to search page with filters
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative">
      <div className="h-[90vh] lg:h-screen relative">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-all duration-1000 transform ${
              index === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 z-10" />
            <img
              src={image}
              alt="Luxury accommodation"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
          <div className="text-center px-4 max-w-6xl mx-auto mb-12">
            <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl text-white mb-6 tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto font-light">
              {t('hero.subtitle')}
            </p>
          </div>

          <SearchBar 
            onSearch={handleSearch}
            isLoading={false}
          />
        </div>
      </div>
    </section>
  );
}