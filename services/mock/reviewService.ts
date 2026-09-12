import { mockReviews } from '@/data/mockReviews';
import { Review } from '@/types/review';
import { wait } from './_shared';

export const reviewService = {
  async getByListingId(listingId: string): Promise<Review[]> {
    await wait();
    return mockReviews.filter((r) => r.listingId === listingId);
  },
};
