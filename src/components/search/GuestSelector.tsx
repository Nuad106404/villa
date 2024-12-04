import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface GuestSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export default function GuestSelector({ value, onChange }: GuestSelectorProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-4 w-72">
      <div className="flex items-center justify-between">
        <span className="font-medium">Guests</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => onChange(Math.max(1, value - 1))}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            disabled={value <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center">{value}</span>
          <button
            onClick={() => onChange(Math.min(16, value + 1))}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            disabled={value >= 16}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}