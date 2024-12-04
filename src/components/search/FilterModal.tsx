import React from 'react';
import { X } from 'lucide-react';
import { SearchFilters } from './SearchBar';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
}

const amenities = [
  'Free WiFi',
  'Pool',
  'Spa',
  'Gym',
  'Restaurant',
  'Room Service',
  'Beach Access',
  'Airport Transfer'
];

const propertyTypes = [
  'Hotel',
  'Villa',
  'Resort',
  'Apartment',
  'Boutique Hotel'
];

export default function FilterModal({ isOpen, onClose, filters, onChange }: FilterModalProps) {
  if (!isOpen) return null;

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onChange({ ...filters, amenities: newAmenities });
  };

  const handlePropertyTypeToggle = (type: string) => {
    const newTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter(t => t !== type)
      : [...filters.propertyType, type];
    onChange({ ...filters, propertyType: newTypes });
  };

  const handlePriceChange = (value: number, index: number) => {
    const newPriceRange = [...filters.priceRange] as [number, number];
    newPriceRange[index] = value;
    onChange({ ...filters, priceRange: newPriceRange });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl max-w-2xl w-full shadow-xl">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-serif">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* Price Range */}
            <div>
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-gray-600">Min Price</label>
                    <input
                      type="number"
                      value={filters.priceRange[0]}
                      onChange={(e) => handlePriceChange(Number(e.target.value), 0)}
                      className="w-full border rounded-lg p-2 mt-1"
                      min={0}
                      max={filters.priceRange[1]}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm text-gray-600">Max Price</label>
                    <input
                      type="number"
                      value={filters.priceRange[1]}
                      onChange={(e) => handlePriceChange(Number(e.target.value), 1)}
                      className="w-full border rounded-lg p-2 mt-1"
                      min={filters.priceRange[0]}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <h3 className="font-medium mb-4">Property Type</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handlePropertyTypeToggle(type)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      filters.propertyType.includes(type)
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-500'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="font-medium mb-4">Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {amenities.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      filters.amenities.includes(amenity)
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-500'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-medium mb-4">Rating</h3>
              <div className="flex gap-3">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => onChange({ ...filters, rating: rating === filters.rating ? null : rating })}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      filters.rating === rating
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-500'
                    }`}
                  >
                    {rating}+
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-4">
            <button
              onClick={() => onChange({
                location: '',
                dates: undefined,
                guests: 2,
                priceRange: [0, 5000],
                amenities: [],
                propertyType: [],
                rating: null
              })}
              className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear all
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Show results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}