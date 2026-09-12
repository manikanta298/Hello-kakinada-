import { useEffect } from 'react';
import { hotelService, listingService, reviewService } from '@/services';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { useAsync } from './useAsync';

export function useHotelDetail(id: string) {
  const recordView = useRecentlyViewedStore((state) => state.record);

  const { data, loading } = useAsync(async () => {
    const listing = (await listingService.getById(id)) ?? (await listingService.getAll())[0];
    const [hotel, reviews] = await Promise.all([
      hotelService.getDetail(listing.id),
      reviewService.getByListingId(listing.id),
    ]);
    return { listing, hotel: hotel ?? null, reviews };
  }, [id]);

  useEffect(() => {
    if (data) recordView(data.listing.id);
  }, [data, recordView]);

  return {
    listing: data?.listing ?? null,
    hotel: data?.hotel ?? null,
    reviews: data?.reviews ?? [],
    loading,
  };
}
