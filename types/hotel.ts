export interface RoomType {
  name: string;
  price: string;
}

export interface HotelDetail {
  listingId: string;
  amenities: string[];
  checkIn: string;
  checkOut: string;
  roomTypes: RoomType[];
}
