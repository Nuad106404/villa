import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Loader2, Users } from 'lucide-react';
import { Property } from '../types/property';
import { PaymentDetails } from '../types/payment';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
  isLoading: boolean;
  price: number;
  nights: number;
  property: Property;
  selectedRange: { from: Date; to: Date } | undefined;
}

export interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  guests: number;
}

export default function BookingModal({
  isOpen,
  onClose,
  isLoading,
  price,
  nights,
  property,
  selectedRange
}: BookingModalProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a unique booking ID
    const bookingId = `BK${Date.now().toString(36).toUpperCase()}`;

    // Create payment details
    const paymentDetails: PaymentDetails = {
      bookingId,
      totalAmount: price * nights,
      customerName: `${formData.firstName} ${formData.lastName}`,
      checkIn: selectedRange?.from || new Date(),
      checkOut: selectedRange?.to || new Date(),
      guests: formData.guests,
      propertyName: property.name,
      expiryTime: Date.now() + 3600000 // 1 hour from now
    };

    // Navigate to payment page
    navigate('/payment', { state: { paymentDetails } });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl max-w-md w-full shadow-xl animate-fadeIn">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6">
            <h2 className="font-serif text-2xl mb-6">Complete Your Booking</h2>
            
            <div className="bg-amber-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Price per night</span>
                <span className="font-medium">${price}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Nights</span>
                <span className="font-medium">{nights}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t border-amber-200">
                <span>Total</span>
                <span>${price * nights}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Guests
                </label>
                <div className="relative">
                  <select
                    id="guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3 pr-10 appearance-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                  >
                    {[...Array(property.type === 'hotel' ? 
                      (property.rooms?.[0]?.maxOccupancy || 4) : 
                      8)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  <Users className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-500 text-white py-4 rounded-lg hover:bg-amber-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-6"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Proceed to Payment'
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              By proceeding, you agree to our terms and conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}