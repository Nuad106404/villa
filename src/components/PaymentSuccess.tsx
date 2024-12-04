import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId, propertyName } = location.state || {};

  if (!bookingId) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>

        <h1 className="font-serif text-3xl mb-4">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your booking at {propertyName} has been confirmed.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <p className="text-sm text-gray-600 mb-2">Booking Reference</p>
          <p className="font-mono text-lg">{bookingId}</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/')}
            className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={() => {/* Handle booking details navigation */}}
            className="w-full border border-amber-500 text-amber-500 py-3 rounded-lg hover:bg-amber-50 transition-colors"
          >
            View Booking Details
          </button>
        </div>
      </div>
    </div>
  );
}