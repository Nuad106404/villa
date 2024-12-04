export interface Room {
  id: string;
  type: string;
  price: number;
  maxOccupancy: number;
  size: number;
  bedType: string;
  amenities: string[];
  description: string;
  images: string[];
  available: boolean;
}

export interface Property {
  id: number;
  name: string;
  type: 'hotel' | 'villa';
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  description?: string;
  rooms?: Room[];
  amenities?: string[];
}