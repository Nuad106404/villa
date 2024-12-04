import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Clock,
  Upload,
  CheckCircle,
  AlertCircle,
  Copy,
  QrCode,
  Building,
  User,
  Calendar,
  Users,
  CreditCard,
  Loader2
} from 'lucide-react';
import { bankAccounts } from '../data/bankAccounts';
import { PaymentDetails } from '../types/payment';

const PAYMENT_TIMEOUT = 60000; // 1 minute in milliseconds

// Rest of the component remains exactly the same
export default function PaymentConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBank, setSelectedBank] = useState(bankAccounts[0]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [paymentSlip, setPaymentSlip] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const paymentDetails = location.state?.paymentDetails as PaymentDetails;

  useEffect(() => {
    if (!paymentDetails) {
      navigate('/');
      return;
    }

    // Initialize or get existing timer
    const storedExpiry = localStorage.getItem(`payment_expiry_${paymentDetails.bookingId}`);
    const expiryTime = storedExpiry ? parseInt(storedExpiry) : Date.now() + PAYMENT_TIMEOUT;

    if (!storedExpiry) {
      localStorage.setItem(`payment_expiry_${paymentDetails.bookingId}`, expiryTime.toString());
    }

    const interval = setInterval(() => {
      const remaining = expiryTime - Date.now();
      if (remaining <= 0) {
        clearInterval(interval);
        navigate('/');
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [paymentDetails, navigate]);

  if (!paymentDetails) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaymentSlip(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentSlip) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear local storage
    localStorage.removeItem(`payment_expiry_${paymentDetails.bookingId}`);
    
    // Navigate to success page
    navigate('/payment-success', { 
      state: { 
        bookingId: paymentDetails.bookingId,
        propertyName: paymentDetails.propertyName 
      }
    });
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white">
            <h1 className="font-serif text-3xl mb-2">Complete Your Payment</h1>
            <p className="opacity-90">Please transfer the payment within the given time</p>
            <div className="mt-4 flex items-center gap-2 bg-white/20 w-fit px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-xl">{formatTime(timeLeft)}</span>
            </div>
          </div>

          <div className="p-8">
            {/* Booking Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <h2 className="font-serif text-2xl mb-4">Booking Details</h2>
                <DetailRow icon={<Building />} label="Property" value={paymentDetails.propertyName} />
                <DetailRow 
                  icon={<User />} 
                  label="Guest Name" 
                  value={paymentDetails.customerName} 
                />
                <DetailRow 
                  icon={<Calendar />} 
                  label="Check-in" 
                  value={format(new Date(paymentDetails.checkIn), 'MMM dd, yyyy')} 
                />
                <DetailRow 
                  icon={<Calendar />} 
                  label="Check-out" 
                  value={format(new Date(paymentDetails.checkOut), 'MMM dd, yyyy')} 
                />
                <DetailRow 
                  icon={<Users />} 
                  label="Guests" 
                  value={`${paymentDetails.guests} guest${paymentDetails.guests > 1 ? 's' : ''}`} 
                />
                <DetailRow 
                  icon={<CreditCard />} 
                  label="Total Amount" 
                  value={`฿${paymentDetails.totalAmount.toLocaleString()}`} 
                  highlight 
                />
              </div>

              {/* Bank Details */}
              <div>
                <h2 className="font-serif text-2xl mb-4">Payment Information</h2>
                <div className="bg-amber-50 rounded-xl p-6 space-y-4">
                  <div className="flex gap-4 mb-6">
                    {bankAccounts.map((bank) => (
                      <button
                        key={bank.bankName}
                        onClick={() => setSelectedBank(bank)}
                        className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                          selectedBank.bankName === bank.bankName
                            ? 'border-amber-500 bg-white'
                            : 'border-transparent bg-white/50'
                        }`}
                      >
                        <img
                          src={`/banks/${bank.bankName.toLowerCase().replace(' ', '-')}.png`}
                          alt={bank.bankName}
                          className="h-8 object-contain mx-auto"
                        />
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank</span>
                      <span className="font-medium">{selectedBank.bankName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Account Number</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{selectedBank.accountNumber}</span>
                        <button
                          onClick={() => copyToClipboard(selectedBank.accountNumber)}
                          className="p-1 hover:bg-amber-100 rounded-md transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Name</span>
                      <span className="font-medium">{selectedBank.accountName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Branch</span>
                      <span className="font-medium">{selectedBank.branch}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => document.getElementById('qr-modal')?.showModal()}
                    className="w-full mt-4 flex items-center justify-center gap-2 bg-white py-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <QrCode className="w-5 h-5" />
                    <span>View QR Code</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Slip Upload */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Payment slip preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentSlip(null);
                        setPreviewUrl('');
                      }}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <label className="block">
                      <span className="bg-amber-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-amber-600 transition-colors inline-block">
                        Upload Payment Slip
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                      Supported formats: JPG, PNG (max 5MB)
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={!paymentSlip || isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Confirm Payment</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <dialog id="qr-modal" className="modal backdrop:bg-black/50 rounded-2xl p-0">
        <div className="p-6 min-w-[300px]">
          <h3 className="font-serif text-xl mb-4">Scan QR Code to Pay</h3>
          <img
            src={selectedBank.qrCode}
            alt="Payment QR Code"
            className="w-full rounded-lg"
          />
          <button
            onClick={() => document.getElementById('qr-modal')?.close()}
            className="w-full mt-4 py-2 text-gray-600 hover:text-gray-900"
          >
            Close
          </button>
        </div>
      </dialog>

      {/* Copy Notification */}
      <div
        className={`fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg transition-all duration-300 transform ${
          copied ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        Copied to clipboard!
      </div>
    </div>
  );
}

const DetailRow = ({ 
  icon, 
  label, 
  value, 
  highlight = false 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  highlight?: boolean;
}) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2 text-gray-600">
      {icon}
      <span>{label}</span>
    </div>
    <span className={highlight ? 'text-xl font-bold text-amber-600' : 'font-medium'}>
      {value}
    </span>
  </div>
);