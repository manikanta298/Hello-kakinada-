import { useEffect } from 'react';
import { listingService, reviewService, workingHoursService } from '@/services';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { useAsync } from './useAsync';

export function useListingDetail(id: string) {
  const recordView = useRecentlyViewedStore((state) => state.record);

  const { data, loading } = useAsync(async () => {
    const listing = (await listingService.getById(id)) ?? (await listingService.getAll())[0];
    const [reviews, hours] = await Promise.all([
      reviewService.getByListingId(listing.id),
      workingHoursService.getForListing(listing.id),
    ]);
    return { listing, reviews, hours };
  }, [id]);

  useEffect(() => {
    if (data) recordView(data.listing.id);
  }, [data, recordView]);

  return {
    listing: data?.listing ?? null,
    reviews: data?.reviews ?? [],
    hours: data?.hours ?? [],
    loading,
  };
}
