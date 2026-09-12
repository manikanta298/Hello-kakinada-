import { useEffect } from 'react';
import { listingService, reviewService, serviceListingService } from '@/services';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { useAsync } from './useAsync';

export function useServiceDetail(id: string) {
  const recordView = useRecentlyViewedStore((state) => state.record);

  const { data, loading } = useAsync(async () => {
    const listing = (await listingService.getById(id)) ?? (await listingService.getAll())[0];
    const [service, reviews] = await Promise.all([
      serviceListingService.getDetail(listing.id),
      reviewService.getByListingId(listing.id),
    ]);
    return { listing, service: service ?? null, reviews };
  }, [id]);

  useEffect(() => {
    if (data) recordView(data.listing.id);
  }, [data, recordView]);

  return {
    listing: data?.listing ?? null,
    service: data?.service ?? null,
    reviews: data?.reviews ?? [],
    loading,
  };
}
