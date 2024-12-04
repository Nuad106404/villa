import { useState, useEffect } from 'react';
import { Property } from '../types/property';
import { SearchFilters } from '../components/search/SearchBar';
import { filterProperties } from '../services/searchService';
import { useDebounce } from './useDebounce';

export function useSearch(initialProperties: Property[]) {
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    dates: undefined,
    guests: 2,
    priceRange: [0, 5000],
    amenities: [],
    propertyType: [],
    rating: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Property[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const debouncedFilters = useDebounce(filters, 300);

  useEffect(() => {
    const performSearch = async () => {
      setIsLoading(true);
      try {
        const filteredResults = filterProperties(initialProperties, debouncedFilters);
        setResults(filteredResults);
        setHasSearched(true);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Perform search if there's a location or if any filter is non-default
    if (
      debouncedFilters.location ||
      debouncedFilters.dates ||
      debouncedFilters.guests !== 2 ||
      debouncedFilters.amenities.length > 0 ||
      debouncedFilters.propertyType.length > 0 ||
      debouncedFilters.rating !== null ||
      debouncedFilters.priceRange[0] !== 0 ||
      debouncedFilters.priceRange[1] !== 5000
    ) {
      performSearch();
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [debouncedFilters, initialProperties]);

  return {
    filters,
    setFilters,
    results,
    isLoading,
    hasSearched
  };
}