import { useEffect } from 'react';
import { listingService, propertyService } from '@/services';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { useAsync } from './useAsync';

export function usePropertyDetail(id: string) {
  const recordView = useRecentlyViewedStore((state) => state.record);

  const { data, loading } = useAsync(async () => {
    const listing = (await listingService.getById(id)) ?? (await listingService.getAll())[0];
    const property = await propertyService.getDetail(listing.id);
    return { listing, property: property ?? null };
  }, [id]);

  useEffect(() => {
    if (data) recordView(data.listing.id);
  }, [data, recordView]);

  return { listing: data?.listing ?? null, property: data?.property ?? null, loading };
}
