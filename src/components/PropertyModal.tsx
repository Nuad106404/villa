import React, { useState } from 'react';
import { X, MapPin, Wifi, Car, Coffee, Utensils, Bath, Star } from 'lucide-react';
import { Property, Room } from '../types/property';
import RoomList from './RoomList';

interface PropertyModalProps {
  property: Property;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: PropertyModalProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const amenities = [
    { icon: <Wifi className="w-5 h-5" />, name: 'Free WiFi' },
    { icon: <Car className="w-5 h-5" />, name: 'Free Parking' },
    { icon: <Coffee className="w-5 h-5" />, name: 'Breakfast' },
    { icon: <Utensils className="w-5 h-5" />, name: 'Restaurant' },
    { icon: <Bath className="w-5 h-5" />, name: 'Pool' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-lg max-w-4xl w-full shadow-xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-h-[90vh] overflow-y-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-96">
                <img
                  src={property.image}
                  alt={property.name}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                />
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-serif text-2xl">{property.name}</h2>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-amber-400 mr-1" />
                      <span className="font-semibold">{property.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{property.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed">
                  Experience unparalleled luxury in this stunning property. Featuring breathtaking views, 
                  premium amenities, and world-class service to ensure an unforgettable stay.
                </p>

                {property.type === 'villa' ? (
                  <>
                    <div>
                      <h3 className="font-semibold mb-3">Amenities</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {amenities.map((amenity, index) => (
                          <div key={index} className="flex items-center text-gray-600">
                            {amenity.icon}
                            <span className="ml-2">{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-2xl font-bold">${property.price}</span>
                          <span className="text-gray-600">/night</span>
                        </div>
                        <span className="text-gray-600">
                          {property.reviews} reviews
                        </span>
                      </div>
                      <button className="w-full bg-amber-400 text-black py-3 rounded hover:bg-amber-300 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </>
                ) : (
                  property.rooms && (
                    <RoomList
                      rooms={property.rooms}
                      onSelectRoom={setSelectedRoom}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}