import { mockHotelDetails } from '@/data/mockHotelDetails';
import { HotelDetail } from '@/types/hotel';
import { wait } from './_shared';

export const hotelService = {
  async getDetail(listingId: string): Promise<HotelDetail | undefined> {
    await wait();
    return mockHotelDetails.find((h) => h.listingId === listingId);
  },
};
