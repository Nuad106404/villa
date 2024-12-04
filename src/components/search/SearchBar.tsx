import React, { useState, useRef, useEffect } from 'react';
import { Search, Calendar, Users, SlidersHorizontal } from 'lucide-react';
import DateRangePicker from './DateRangePicker';
import LocationSearch from './LocationSearch';
import GuestSelector from './GuestSelector';
import FilterModal from './FilterModal';
import { DateRange } from 'react-day-picker';
import { useTranslation } from 'react-i18next';

export interface SearchFilters {
  location: string;
  dates: DateRange | undefined;
  guests: number;
  priceRange: [number, number];
  amenities: string[];
  propertyType: string[];
  rating: number | null;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  isLoading?: boolean;
  initialFilters?: SearchFilters;
}

export default function SearchBar({ onSearch, isLoading, initialFilters }: SearchBarProps) {
  const { t } = useTranslation();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters || {
    location: '',
    dates: undefined,
    guests: 2,
    priceRange: [0, 5000],
    amenities: [],
    propertyType: [],
    rating: null
  });

  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
        setIsGuestSelectorOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters);
    }
  };

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    if (onSearch) {
      onSearch(updatedFilters);
    }
  };

  return (
    <div ref={searchBarRef} className="relative z-20 max-w-6xl mx-auto">
      <div className="bg-white rounded-full shadow-lg p-2 flex items-center gap-2">
        <div className="relative flex-1">
          <LocationSearch
            value={filters.location}
            onChange={(location) => updateFilters({ location })}
          />
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setIsDatePickerOpen(!isDatePickerOpen);
              setIsGuestSelectorOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Calendar className="w-5 h-5 text-amber-500" />
            <span className="text-gray-700">
              {filters.dates?.from
                ? `${filters.dates.from.toLocaleDateString()} - ${
                    filters.dates.to?.toLocaleDateString() || 'Select'
                  }`
                : t('search.dates')}
            </span>
          </button>

          {isDatePickerOpen && (
            <div className="absolute top-full mt-2 right-0">
              <DateRangePicker
                selected={filters.dates}
                onSelect={(range) => {
                  updateFilters({ dates: range });
                  setIsDatePickerOpen(false);
                }}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setIsGuestSelectorOpen(!isGuestSelectorOpen);
              setIsDatePickerOpen(false);
            }}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Users className="w-5 h-5 text-amber-500" />
            <span className="text-gray-700">
              {filters.guests} {filters.guests === 1 ? t('search.guest') : t('search.guests')}
            </span>
          </button>

          {isGuestSelectorOpen && (
            <div className="absolute top-full mt-2 right-0">
              <GuestSelector
                value={filters.guests}
                onChange={(guests) => {
                  updateFilters({ guests });
                  setIsGuestSelectorOpen(false);
                }}
              />
            </div>
          )}
        </div>

        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5 text-amber-500" />
        </button>

        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          <span>{t('search.search')}</span>
        </button>
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onChange={(newFilters) => {
          setFilters(newFilters);
          if (onSearch) {
            onSearch(newFilters);
          }
        }}
      />
    </div>
  );
}