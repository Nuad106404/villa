import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { properties } from '../data/properties';

export default function Properties() {
  const navigate = useNavigate();

  const handlePropertyClick = (id: number) => {
    navigate(`/property/${id}`);
  };

  return (
    <section id="properties" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">
            Featured Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience luxury living at its finest in our hand-picked collection
            of exclusive properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              onClick={() => handlePropertyClick(property.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const PropertyCard = ({
  name,
  location,
  price,
  rating,
  reviews,
  image,
  type,
  rooms,
  onClick,
}: {
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  type: 'hotel' | 'villa';
  rooms?: any[];
  onClick: () => void;
}) => (
  <div
    className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
    onClick={onClick}
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
            onClick();
          }}
          className="text-amber-600 hover:text-amber-700 font-medium transition-colors flex items-center group-hover:underline"
        >
          View Details
        </button>
      </div>
    </div>
  </div>
);
