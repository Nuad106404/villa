import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { Property } from '../../types/property';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SearchResultsProps {
  results: Property[];
  isLoading: boolean;
  hasSearched?: boolean;
}

export default function SearchResults({ results, isLoading, hasSearched }: SearchResultsProps) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
      </div>
    );
  }

  // Only show no results message if a search has been performed
  if (hasSearched && results.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium text-gray-900 mb-2">{t('search.noResults')}</h3>
        <p className="text-gray-600">{t('search.tryAdjusting')}</p>
      </div>
    );
  }

  // Don't show anything if no search has been performed
  if (!hasSearched) {
    return null;
  }

  return (
    <div>
      <h2 className="font-serif text-3xl text-gray-900 mb-8">{t('search.results')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
}

function PropertyCard({
  id,
  name,
  location,
  price,
  rating,
  reviews,
  image,
  type,
  rooms,
}: Property) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${id}`);
  };

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden aspect-w-16 aspect-h-10">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-none px-4 py-2 rounded-lg text-gray-900 shadow-lg absolute">
            <span className="font-semibold">
              ${type === 'hotel' && rooms ? `${rooms[0].price}` : price}
            </span>
            <span className="text-gray-600 text-sm">/night</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-serif text-xl text-gray-900 group-hover:text-amber-600 transition-colors">
            {name}
          </h3>
          <span className="text-xs uppercase tracking-wider bg-amber-50 text-amber-700 px-3 py-1 rounded-lg font-medium">
            {type}
          </span>
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1 text-amber-500" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center bg-gray-50 px-3 py-1 rounded-lg">
            <Star className="w-5 h-5 text-amber-400 mr-1" fill="currentColor" />
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-500 text-sm ml-1">({reviews})</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="text-amber-600 hover:text-amber-700 font-medium transition-colors flex items-center group-hover:underline"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}