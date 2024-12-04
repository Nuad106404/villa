import React from 'react';
import {
  Wifi,
  Car,
  Coffee,
  Utensils,
  Dumbbell,
  Plane,
  Bath,
  Mountain,
  Wine,
  Snowflake,
  Bike,
  Sunrise,
  Waves, // Changed from Wave to Waves
  Tent,
  Trees,
  Library,
  Shirt,
  Leaf,
  UtensilsCrossed,
  Heart,
  Tv,
  Gamepad,
  Bell,
  Droplets,
  LucideIcon,
  LucideProps
} from 'lucide-react';

// Map of amenity names to their corresponding icons
const amenityIcons: Record<string, LucideIcon> = {
  'Free WiFi': Wifi,
  'Pool': Droplets,
  'Private Pool': Droplets,
  'Parking': Car,
  'Free Parking': Car,
  'Room Service': Coffee,
  'Restaurant': Utensils,
  'Gym': Dumbbell,
  'Fitness Center': Dumbbell,
  'Airport Transfer': Plane,
  'Hot Tub': Bath,
  'Spa': Heart,
  'Mountain View': Mountain,
  'Ocean View': Waves, // Changed from Wave to Waves
  'Beach Access': Waves, // Changed from Wave to Waves
  'Wine Cellar': Wine,
  'Air Conditioning': Snowflake,
  'Bicycle Rental': Bike,
  'Daily Breakfast': Coffee,
  'Water Sports': Waves, // Changed from Wave to Waves
  'Camping': Tent,
  'Garden': Trees,
  'Library': Library,
  'Kimono Rental': Shirt,
  'Eco-friendly': Leaf,
  'Kitchen': UtensilsCrossed,
  'Daily Housekeeping': Bell,
  'Smart TV': Tv,
  'Game Room': Gamepad,
  'BBQ Area': UtensilsCrossed,
  'Ski Storage': Mountain,
  'Heated Pool': Droplets,
  'Ski-in/Ski-out': Mountain,
  'Traditional Garden': Trees,
  'Tea Ceremony Room': Coffee,
  'Hot Spring Bath': Bath,
  'Meditation Space': Heart,
  'Japanese Breakfast': Coffee,
  'Cultural Activities': Leaf,
  'Game Drives': Car,
  'Private Viewing Deck': Mountain,
  'Private Deck': Mountain,
  'Outdoor Shower': Bath,
  'Safari Views': Mountain,
  'Outdoor Deck': Mountain,
  'Glass Floor Panel': Waves, // Changed from Wave to Waves
  'Butler Service': Bell,
  'Direct Ocean Access': Waves, // Changed from Wave to Waves
  'Mini Bar': Wine,
  'Rain Shower': Bath,
  'Private Balcony': Sunrise,
  'Private Terrace': Sunrise,
  'Outdoor Jacuzzi': Bath,
  'Caldera View': Mountain,
  'Rice Field View': Trees,
  'Desert Views': Mountain,
  'Desert Activities': Mountain,
  'Equipment Rental': Bike,
  'Hiking Tours': Mountain,
  'Vineyard': Wine,
  'Aurora Viewing': Sunrise,
  'Winter Activities': Snowflake
};

interface AmenityIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export default function AmenityIcon({ name, ...props }: AmenityIconProps) {
  const Icon = amenityIcons[name] || Leaf; // Default to Leaf icon if no match found
  return <Icon {...props} />;
}