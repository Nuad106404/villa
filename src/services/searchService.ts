import { Property } from '../types/property';
import { SearchFilters } from '../components/search/SearchBar';
import { isWithinInterval, parseISO } from 'date-fns';

export function filterProperties(properties: Property[], filters: SearchFilters): Property[] {
  return properties.filter(property => {
    // Location filter
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }

    // Price range filter
    const price = property.type === 'hotel' && property.rooms 
      ? Math.min(...property.rooms.map(room => room.price))
      : property.price;
    
    if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
      return false;
    }

    // Property type filter
    if (filters.propertyType.length > 0 && 
        !filters.propertyType.includes(property.type.charAt(0).toUpperCase() + property.type.slice(1))) {
      return false;
    }

    // Rating filter
    if (filters.rating && property.rating < filters.rating) {
      return false;
    }

    // Amenities filter (assuming amenities are added to the Property type)
    if (filters.amenities.length > 0) {
      const propertyAmenities = property.amenities || [];
      if (!filters.amenities.every(amenity => propertyAmenities.includes(amenity))) {
        return false;
      }
    }

    // Guest capacity filter
    if (property.type === 'hotel' && property.rooms) {
      const hasValidRoom = property.rooms.some(room => room.maxOccupancy >= filters.guests);
      if (!hasValidRoom) {
        return false;
      }
    }

    return true;
  });
}