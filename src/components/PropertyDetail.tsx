import React, { useState } from 'react';
import { format, differenceInDays } from 'date-fns';
import { DayPicker, DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { Property, Room } from '../types/property';
import { PaymentDetails } from '../types/payment';
import { useTranslation } from 'react-i18next';
import {
  Star,
  MapPin,
  Users,
  Info,
} from 'lucide-react';
import BookingModal, { BookingFormData } from './BookingModal';
import RoomList from './RoomList';
import PropertyGallery from './PropertyGallery';
import AmenityIcon from './AmenityIcon';

interface PropertyDetailProps {
  property: Property;
}

export default function PropertyDetail({ property }: PropertyDetailProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedRange, setSelectedRange] = useState<DateRange | undefined>();
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'reviews'>('overview');

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range?.from && !range.to) {
      // If only the first date is selected, set both from and to to the same date
      setSelectedRange({
        from: range.from,
        to: range.from
      });
    } else {
      setSelectedRange(range);
    }
  };

  const numberOfNights = selectedRange?.from && selectedRange?.to
    ? Math.max(1, differenceInDays(selectedRange.to, selectedRange.from) + 1)
    : 0;

  const currentPrice = property.type === 'hotel' ? selectedRoom?.price || 0 : property.price;
  const totalPrice = currentPrice * numberOfNights;

  const handleBookingSubmit = async (data: BookingFormData) => {
    setIsLoading(true);
    try {
      // Generate a unique booking ID
      const bookingId = `BK${Date.now().toString(36).toUpperCase()}`;

      // Create payment details
      const paymentDetails: PaymentDetails = {
        bookingId,
        totalAmount: totalPrice,
        customerName: `${data.firstName} ${data.lastName}`,
        checkIn: selectedRange?.from || new Date(),
        checkOut: selectedRange?.to || new Date(),
        guests: data.guests,
        propertyName: property.name,
        expiryTime: Date.now() + 60000 // 1 minute from now
      };

      // Navigate to payment page with payment details
      navigate('/payment', { state: { paymentDetails } });
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsLoading(false);
      setIsBookingModalOpen(false);
    }
  };

  // Generate gallery images from property and room images
  const galleryImages = [
    property.image,
    ...(property.type === 'hotel' && property.rooms 
      ? property.rooms.flatMap(room => room.images)
      : [])
  ];

   // Available tabs based on property type
   const availableTabs = property.type === 'villa' 
   ? ['overview', 'reviews'] as const
   : ['overview', 'rooms', 'reviews'] as const;

  return (
    <div className="min-h-screen bg-white">
      {/* Gallery */}
      <PropertyGallery 
        images={galleryImages} 
        title={property.name}
        price={currentPrice}
        location={property.location}
        rating={property.rating}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="font-serif text-4xl">{property.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                    <Star className="w-5 h-5 text-amber-400" fill="currentColor" />
                    <span className="ml-1 font-semibold">{property.rating}</span>
                  </div>
                  <span className="text-gray-500">({property.reviews} {t('property.reviews')})</span>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{property.location}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b mb-8">
              <div className="flex gap-8">
                {availableTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 relative capitalize ${
                      activeTab === tab
                        ? 'text-amber-500 font-medium'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {t(`property.${tab}`)}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-serif text-2xl mb-4">{t('property.aboutProperty')}</h2>
                  <p className="text-gray-600 leading-relaxed">{property.description}</p>
                </div>

                <div>
                  <h2 className="font-serif text-2xl mb-6">{t('property.amenities')}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {property.amenities?.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-4 rounded-xl bg-gray-50 hover:bg-amber-50 transition-colors group"
                      >
                        <div className="p-2 bg-white rounded-lg text-amber-500 group-hover:text-amber-600 transition-colors">
                          <AmenityIcon name={amenity} className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rooms' && property.type === 'hotel' && property.rooms && (
              <RoomList
                rooms={property.rooms}
                onSelectRoom={setSelectedRoom}
                selectedRoom={selectedRoom}
              />
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Reviews content */}
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="mb-6">
                  <span className="text-3xl font-bold text-amber-600">${currentPrice}</span>
                  <span className="text-gray-600">/{t('property.perNight')}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('property.selectDates')}
                    </label>
                    <div className="border rounded-xl p-4 bg-white">
                      <DayPicker
                        mode="range"
                        selected={selectedRange}
                        onSelect={handleDateSelect}
                        numberOfMonths={1}
                        className="!w-full"
                        fromDate={new Date()}
                      />
                    </div>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                    onClick={() => setIsBookingModalOpen(true)}
                    disabled={!selectedRange?.from || (property.type === 'hotel' && !selectedRoom)}
                  >
                    {property.type === 'hotel' && !selectedRoom
                      ? t('property.pleaseSelectRoom')
                      : t('property.bookNow')}
                  </button>

                  {numberOfNights > 0 && (
                    <div className="mt-6 border-t pt-6 space-y-2">
                      <div className="flex justify-between text-gray-600">
                        <span>${currentPrice} × {numberOfNights} {numberOfNights === 1 ? t('property.night') : t('property.nights')}</span>
                        <span>${totalPrice}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2">
                        <span>{t('property.total')}</span>
                        <span className="text-amber-600">${totalPrice}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        onSubmit={handleBookingSubmit}
        isLoading={isLoading}
        price={currentPrice}
        nights={numberOfNights}
        property={property}
        selectedRange={selectedRange}
      />
    </div>
  );
}