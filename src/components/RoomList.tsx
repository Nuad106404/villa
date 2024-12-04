import React from 'react';
import { Room } from '../types/property';
import { Users, Maximize, Bed, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AmenityIcon from './AmenityIcon';

interface RoomListProps {
  rooms: Room[];
  onSelectRoom: (room: Room) => void;
  selectedRoom?: Room;
}

export default function RoomList({ rooms, onSelectRoom, selectedRoom }: RoomListProps) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h3 className="font-serif text-2xl mb-4">{t('property.availableRooms')}</h3>
      <div className="space-y-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`border rounded-xl transition-all duration-300 ${
              !room.available 
                ? 'opacity-60 bg-gray-50' 
                : selectedRoom?.id === room.id
                ? 'border-amber-400 bg-amber-50/50 shadow-lg'
                : 'hover:border-amber-400 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col md:flex-row gap-6 p-6">
              {/* Room Image */}
              <div className="w-full md:w-1/3">
                <div className="aspect-w-16 aspect-h-10 rounded-lg overflow-hidden">
                  <img
                    src={room.images[0]}
                    alt={room.type}
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Room Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-serif text-xl">{room.type}</h4>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-600">${room.price}</div>
                      <div className="text-sm text-gray-500">{t('property.perNight')}</div>
                    </div>
                  </div>

                  {/* Room Specs */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{t('property.upTo')} {room.maxOccupancy} {t('property.guests')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="w-4 h-4" />
                      <span>{room.size} m²</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>{room.bedType}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm">{room.description}</p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 text-xs px-2 py-1 bg-gray-100 rounded-full"
                    >
                      <AmenityIcon name={amenity} className="w-3 h-3 text-amber-500" />
                      {amenity}
                    </span>
                  ))}
                </div>

                {/* Selection Button */}
                <div className="flex items-center justify-between pt-4">
                  {room.available ? (
                    <button
                      onClick={() => onSelectRoom(room)}
                      className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-300 ${
                        selectedRoom?.id === room.id
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'border-2 border-amber-500 text-amber-500 hover:bg-amber-50'
                      }`}
                    >
                      {selectedRoom?.id === room.id ? (
                        <>
                          <Check className="w-5 h-5" />
                          {t('property.selected')}
                        </>
                      ) : (
                        t('property.selectRoom')
                      )}
                    </button>
                  ) : (
                    <span className="inline-flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
                      {t('property.notAvailable')}
                    </span>
                  )}

                  {selectedRoom?.id === room.id && (
                    <span className="text-sm text-amber-600 animate-fadeIn">
                      {t('property.roomSelected')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}