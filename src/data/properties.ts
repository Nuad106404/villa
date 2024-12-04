import { Property } from '../types/property';

export const properties: Property[] = [
  // Existing properties remain the same
  {
    id: 1,
    name: 'Villa Athena',
    type: 'villa',
    location: 'Santorini, Greece',
    price: 1200,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800',
    amenities: [
      'Free WiFi',
      'Private Pool',
      'Ocean View',
      'Kitchen',
      'Air Conditioning',
      'Beach Access',
      'Daily Housekeeping',
      'Airport Transfer'
    ],
    description: 'Perched on the cliffs of Santorini, Villa Athena offers breathtaking views of the Aegean Sea. This luxurious villa features traditional Cycladic architecture with modern amenities.'
  },
  {
    id: 2,
    name: 'Grand Azure Resort',
    type: 'hotel',
    location: 'Maldives',
    price: 500,
    rating: 4.8,
    reviews: 96,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800',
    amenities: [
      'Free WiFi',
      'Spa',
      'Pool',
      'Beach Access',
      'Room Service',
      'Restaurant',
      'Fitness Center',
      'Water Sports'
    ],
    rooms: [
      {
        id: 'GAR-001',
        type: 'Deluxe Ocean View',
        price: 500,
        maxOccupancy: 2,
        size: 45,
        bedType: '1 King Bed',
        amenities: ['Ocean View', 'Private Balcony', 'Rain Shower', 'Mini Bar', 'Room Service'],
        description: 'Luxurious room with stunning ocean views and modern amenities',
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800',
          'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=800'
        ],
        available: true
      },
      {
        id: 'GAR-002',
        type: 'Premium Overwater Villa',
        price: 1200,
        maxOccupancy: 2,
        size: 85,
        bedType: '1 King Bed',
        amenities: ['Direct Ocean Access', 'Private Pool', 'Glass Floor Panel', 'Outdoor Deck', 'Butler Service'],
        description: 'Exclusive overwater villa with private pool and direct ocean access',
        images: [
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800',
          'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=800'
        ],
        available: true
      }
    ]
  },
  // ... existing properties ...
  {
    id: 7,
    name: 'Kyoto Zen Retreat',
    type: 'hotel',
    location: 'Kyoto, Japan',
    price: 450,
    rating: 4.8,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800',
    amenities: [
      'Traditional Garden',
      'Tea Ceremony Room',
      'Hot Spring Bath',
      'Meditation Space',
      'Japanese Breakfast',
      'Kimono Rental',
      'Free WiFi',
      'Cultural Activities'
    ],
    rooms: [
      {
        id: 'KZR-001',
        type: 'Traditional Japanese Room',
        price: 450,
        maxOccupancy: 2,
        size: 40,
        bedType: 'Futon',
        amenities: ['Tatami Flooring', 'Garden View', 'Private Bath', 'Yukata Robes'],
        description: 'Authentic Japanese-style room with traditional furnishings and garden views',
        images: [
          'https://images.unsplash.com/photo-1522547902298-51566e4fb383?auto=format&fit=crop&w=800',
          'https://images.unsplash.com/photo-1522547384083-90a06743f3d2?auto=format&fit=crop&w=800'
        ],
        available: true
      }
    ]
  },
  {
    id: 8,
    name: 'Safari Lodge Serengeti',
    type: 'hotel',
    location: 'Serengeti, Tanzania',
    price: 800,
    rating: 4.9,
    reviews: 92,
    image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800',
    amenities: [
      'Game Drives',
      'Private Viewing Deck',
      'Pool',
      'Restaurant',
      'Bar',
      'Spa',
      'WiFi',
      'Airport Transfer'
    ],
    rooms: [
      {
        id: 'SLS-001',
        type: 'Luxury Tent',
        price: 800,
        maxOccupancy: 2,
        size: 60,
        bedType: '1 King Bed',
        amenities: ['Private Deck', 'Outdoor Shower', 'Mini Bar', 'Safari Views'],
        description: 'Luxury tented accommodation with stunning views of the Serengeti plains',
        images: [
          'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=800',
          'https://images.unsplash.com/photo-1490682143684-14369e18dce8?auto=format&fit=crop&w=800'
        ],
        available: true
      }
    ]
  },
  {
    id: 9,
    name: 'Aspen Mountain Lodge',
    type: 'hotel',
    location: 'Aspen, USA',
    price: 750,
    rating: 4.7,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1517320964276-a002fa203177?auto=format&fit=crop&w=800',
    amenities: [
      'Ski-in/Ski-out',
      'Heated Pool',
      'Hot Tub',
      'Spa',
      'Restaurant',
      'Bar',
      'Fitness Center',
      'Ski Storage'
    ],
    rooms: [
      {
        id: 'AML-001',
        type: 'Mountain View Suite',
        price: 750,
        maxOccupancy: 4,
        size: 70,
        bedType: '1 King Bed + Sofa Bed',
        amenities: ['Fireplace', 'Balcony', 'Kitchen', 'Mountain Views'],
        description: 'Spacious suite with stunning mountain views and modern alpine decor',
        images: [
          'https://images.unsplash.com/photo-1517320964276-a002fa203177?auto=format&fit=crop&w=800',
          'https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&w=800'
        ],
        available: true
      }
    ]
  },
  {
    id: 10,
    name: 'Santorini Secret Suites',
    type: 'hotel',
    location: 'Santorini, Greece',
    price: 600,
    rating: 4.8,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1570957174114-f63756b3f4bb?auto=format&fit=crop&w=800',
    amenities: [
      'Infinity Pool',
      'Restaurant',
      'Bar',
      'Spa',
      'Room Service',
      'Airport Transfer',
      'Concierge',
      'Free WiFi'
    ],
    rooms: [
      {
        id: 'SSS-001',
        type: 'Caldera View Suite',
        price: 600,
        maxOccupancy: 2,
        size: 45,
        bedType: '1 King Bed',
        amenities: ['Private Terrace', 'Outdoor Jacuzzi', 'Caldera View', 'Mini Bar'],
        description: 'Romantic suite with private terrace and stunning caldera views',
        images: [
          'https://images.unsplash.com/photo-1570957174114-f63756b3f4bb?auto=format&fit=crop&w=800',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800'
        ],
        available: true
      }
    ]
  },
  {
    id: 11,
    name: 'Bali Bamboo Villa',
    type: 'villa',
    location: 'Ubud, Bali',
    price: 400,
    rating: 4.9,
    reviews: 143,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800',
    amenities: [
      'Private Pool',
      'Rice Field View',
      'Free WiFi',
      'Kitchen',
      'Daily Breakfast',
      'Yoga Deck',
      'Bicycle Rental',
      'Airport Transfer'
    ],
    description: 'Eco-friendly bamboo villa surrounded by lush rice terraces, offering a unique blend of luxury and sustainability.'
  },
  {
    id: 12,
    name: 'Desert Rose Resort',
    type: 'hotel',
    location: 'Dubai, UAE',
    price: 550,
    rating: 4.7,
    reviews: 211,
    image: 'https://images.unsplash.com/photo-1512958789358-4dac0f880800?auto=format&fit=crop&w=800',
    amenities: [
      'Desert Views',
      'Pool',
      'Spa',
      'Restaurant',
      'Bar',
      'Desert Activities',
      'Free WiFi',
      'Airport Transfer'
    ],
    rooms: [
      {
        id: 'DRR-001',
        type: 'Desert View Room',
        price: 550,
        maxOccupancy: 2,
        size: 50,
        bedType: '1 King Bed',
        amenities: ['Desert View', 'Balcony', 'Mini Bar', 'Room Service'],
        description: 'Modern room with panoramic desert views',
        images: [
          'https://images.unsplash.com/photo-1512958789358-4dac0f880800?auto=format&fit=crop&w=800',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800'
        ],
        available: true
      }
    ]
  },
  {
    id: 13,
    name: 'Patagonia Eco Lodge',
    type: 'hotel',
    location: 'Torres del Paine, Chile',
    price: 480,
    rating: 4.8,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800',
    amenities: [
      'Mountain Views',
      'Restaurant',
      'Bar',
      'Hiking Tours',
      'Equipment Rental',
      'Library',
      'Free WiFi',
      'Transfer Service'
    ],
    rooms: [
      {
        id: 'PEL-001',
        type: 'Mountain View Room',
        price: 480,
        maxOccupancy: 2,
        size: 35,
        bedType: '1 Queen Bed',
        amenities: ['Mountain View', 'Heating', 'Private Bath', 'Desk'],
        description: 'Cozy room with stunning views of Torres del Paine',
        images: [
          'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800',
          'https://images.unsplash.com/photo-1490682143684-14369e18dce8?auto=format&fit=crop&w=800'
        ],
        available: true
      }
    ]
  },
  {
    id: 14,
    name: 'Tuscan Villa Estate',
    type: 'villa',
    location: 'Tuscany, Italy',
    price: 900,
    rating: 4.9,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&w=800',
    amenities: [
      'Private Pool',
      'Vineyard',
      'Wine Cellar',
      'Garden',
      'Kitchen',
      'BBQ Area',
      'Free WiFi',
      'Parking'
    ],
    description: 'Historic Tuscan villa surrounded by vineyards and olive groves, offering authentic Italian countryside living.'
  },
  {
    id: 15,
    name: 'Northern Lights Lodge',
    type: 'hotel',
    location: 'Tromsø, Norway',
    price: 420,
    rating: 4.7,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1520681279154-51b3fb4e5e8c?auto=format&fit=crop&w=800',
    amenities: [
      'Aurora Viewing',
      'Restaurant',
      'Bar',
      'Sauna',
      'Winter Activities',
      'Equipment Rental',
      'Free WiFi',
      'Airport Transfer'
    ],
    rooms: [
      {
        id: 'NLL-001',
        type: 'Glass Roof Suite',
        price: 420,
        maxOccupancy: 2,
        size: 30,
        bedType: '1 Queen Bed',
        amenities: ['Glass Roof', 'Heated Floors', 'Mini Bar', 'Northern Lights View'],
        description: 'Unique suite with glass roof for aurora viewing',
        images: [
          'https://images.unsplash.com/photo-1520681279154-51b3fb4e5e8c?auto=format&fit=crop&w=800',
          'https://images.unsplash.com/photo-1517320964276-a002fa203177?auto=format&fit=crop&w=800'
        ],
        available: true
      }
    ]
  }
];