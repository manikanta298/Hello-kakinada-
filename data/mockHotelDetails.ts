import { HotelDetail } from '@/types/hotel';

export const mockHotelDetails: HotelDetail[] = [
  {
    listingId: 'l2',
    amenities: ['Free Wi-Fi', 'AC Rooms', 'Restaurant', 'Parking', 'Room Service'],
    checkIn: '12:00 PM',
    checkOut: '11:00 AM',
    roomTypes: [
      { name: 'Standard Room', price: '₹2,200/night' },
      { name: 'Deluxe Room', price: '₹2,900/night' },
      { name: 'Suite', price: '₹4,200/night' },
    ],
  },
];
