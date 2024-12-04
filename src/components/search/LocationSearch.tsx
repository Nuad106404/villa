import React, { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LocationSearchProps {
  value: string;
  onChange: (location: string) => void;
}

// Get unique locations from properties
const popularLocations = [
  'Santorini, Greece',
  'Maldives',
  'Amalfi Coast, Italy',
  'Bali, Indonesia',
  'Dubai, UAE',
  'Phuket, Thailand',
  'Kyoto, Japan',
  'Aspen, USA',
  'Torres del Paine, Chile',
  'Tuscany, Italy',
  'Tromsø, Norway'
];

export default function LocationSearch({ value, onChange }: LocationSearchProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = popularLocations.filter(location =>
    location.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div ref={searchRef} className="relative">
      <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors cursor-text">
        <MapPin className="w-5 h-5 text-amber-500" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('search.location')}
          className="bg-transparent border-none outline-none w-full placeholder-gray-500"
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-80 bg-white rounded-2xl shadow-xl p-4 z-50">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">{t('search.popularDestinations')}</h3>
            <div className="space-y-1">
              {filteredLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => {
                    onChange(location);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 w-full p-2 hover:bg-gray-100 rounded-lg transition-colors text-left"
                >
                  <MapPin className="w-5 h-5 text-amber-500" />
                  <span>{location}</span>
                </button>
              ))}
              {filteredLocations.length === 0 && (
                <div className="text-gray-500 text-sm p-2">
                  {t('search.noResults')}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}