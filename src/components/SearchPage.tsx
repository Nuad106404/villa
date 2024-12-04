import React from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './search/SearchBar';
import { useSearch } from '../hooks/useSearch';
import { properties } from '../data/properties';
import SearchResults from './search/SearchResults';
import { useTranslation } from 'react-i18next';

export default function SearchPage() {
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Get all search parameters
  const initialFilters = {
    location: searchParams.get('location') || '',
    guests: parseInt(searchParams.get('guests') || '2', 10),
    dates: {
      from: searchParams.get('checkIn') ? new Date(searchParams.get('checkIn')!) : undefined,
      to: searchParams.get('checkOut') ? new Date(searchParams.get('checkOut')!) : undefined,
    },
    priceRange: [0, 5000],
    amenities: [],
    propertyType: ['Hotel', 'Villa'],
    rating: null
  };

  const { filters, setFilters, results, isLoading, hasSearched } = useSearch(properties);

  // Set initial filters from URL parameters
  React.useEffect(() => {
    if (initialFilters.location || initialFilters.guests !== 2 || initialFilters.dates.from) {
      setFilters(initialFilters);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Search Header */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <SearchBar 
            onSearch={setFilters} 
            isLoading={isLoading}
            initialFilters={filters}
          />
        </div>
      </div>

      {/* Search Results */}
      <div className="container mx-auto px-4 py-12">
        <SearchResults 
          results={results} 
          isLoading={isLoading} 
          hasSearched={hasSearched}
        />
      </div>
    </div>
  );
}