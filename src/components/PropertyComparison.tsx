import React from 'react';
import { Property } from '../types/property';
import { X, Check, Star } from 'lucide-react';

interface PropertyComparisonProps {
  properties: Property[];
  onClose: (id: number) => void;
}

export default function PropertyComparison({ properties, onClose }: PropertyComparisonProps) {
  if (properties.length === 0) return null;

  const allAmenities = Array.from(
    new Set(properties.flatMap(p => p.amenities || []))
  ).sort();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl rounded-t-3xl transform transition-transform duration-500 z-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl">Compare Properties</h2>
          <button
            onClick={() => properties.forEach(p => onClose(p.id))}
            className="text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 bg-gray-50 sticky left-0 z-10">Property</th>
                {properties.map(property => (
                  <th key={property.id} className="p-4 min-w-[300px]">
                    <div className="relative">
                      <button
                        onClick={() => onClose(property.id)}
                        className="absolute -top-2 -right-2 p-1 bg-gray-100 rounded-full hover:bg-gray-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <h3 className="font-serif text-xl mb-2">{property.name}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-amber-400" fill="currentColor" />
                          <span className="ml-1">{property.rating}</span>
                        </div>
                        <span className="text-gray-500">({property.reviews} reviews)</span>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 bg-gray-50 font-medium sticky left-0">Location</td>
                {properties.map(property => (
                  <td key={property.id} className="p-4">{property.location}</td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-gray-50 font-medium sticky left-0">Price per night</td>
                {properties.map(property => (
                  <td key={property.id} className="p-4">
                    ${property.type === 'hotel' && property.rooms 
                      ? `${property.rooms[0].price} - ${property.rooms[property.rooms.length - 1].price}`
                      : property.price}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 bg-gray-50 font-medium sticky left-0">Type</td>
                {properties.map(property => (
                  <td key={property.id} className="p-4 capitalize">{property.type}</td>
                ))}
              </tr>
              {property.type === 'hotel' && (
                <tr>
                  <td className="p-4 bg-gray-50 font-medium sticky left-0">Room Types</td>
                  {properties.map(property => (
                    <td key={property.id} className="p-4">
                      {property.rooms?.map(room => room.type).join(', ') || '-'}
                    </td>
                  ))}
                </tr>
              )}
              <tr>
                <td className="p-4 bg-gray-50 font-medium sticky left-0">Amenities</td>
                {properties.map(property => (
                  <td key={property.id} className="p-4">
                    <div className="space-y-2">
                      {allAmenities.map(amenity => (
                        <div key={amenity} className="flex items-center gap-2">
                          {property.amenities?.includes(amenity) ? (
                            <Check className="w-4 h-4 text-green-500" />
                          ) : (
                            <X className="w-4 h-4 text-red-500" />
                          )}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}