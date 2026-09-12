import { useEffect } from 'react';
import { jobService, listingService } from '@/services';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { useAsync } from './useAsync';

export function useJobDetail(id: string) {
  const recordView = useRecentlyViewedStore((state) => state.record);

  const { data, loading } = useAsync(async () => {
    const listing = (await listingService.getById(id)) ?? (await listingService.getAll())[0];
    const job = await jobService.getDetail(listing.id);
    return { listing, job: job ?? null };
  }, [id]);

  useEffect(() => {
    if (data) recordView(data.listing.id);
  }, [data, recordView]);

  return { listing: data?.listing ?? null, job: data?.job ?? null, loading };
}
