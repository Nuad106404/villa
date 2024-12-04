import React from 'react';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { properties } from '../data/properties';
import { useTranslation } from 'react-i18next';

// Group properties by location and get unique destinations
const destinations = Object.values(
  properties.reduce((acc, property) => {
    const location = property.location;
    if (!acc[location]) {
      acc[location] = {
        id: property.id,
        name: location,
        image: property.image,
        properties: 1
      };
    } else {
      acc[location].properties += 1;
    }
    return acc;
  }, {} as Record<string, { id: number; name: string; image: string; properties: number }>)
);

export default function Destinations() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDestinationClick = (location: string) => {
    // Navigate to search page with the selected location and trigger search
    navigate(`/search?location=${encodeURIComponent(location)}`);
  };

  return (
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-gray-900 mb-4">
            {t('destinations.title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('destinations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              {...destination}
              onClick={() => handleDestinationClick(destination.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const DestinationCard = ({
  name,
  image,
  properties: propertyCount,
  onClick,
}: {
  name: string;
  image: string;
  properties: number;
  onClick: () => void;
}) => (
  <div
    className="group relative overflow-hidden rounded-lg cursor-pointer transform transition-all duration-500 hover:-translate-y-1"
    onClick={onClick}
  >
    <div className="aspect-w-3 aspect-h-4">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-white font-serif text-xl mb-2">{name}</h3>
        <div className="flex items-center text-amber-400">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {propertyCount} {propertyCount === 1 ? 'Property' : 'Properties'}
          </span>
        </div>
      </div>
    </div>
  </div>
);