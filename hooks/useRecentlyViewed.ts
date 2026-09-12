import { useMemo } from 'react';
import { listingService } from '@/services';
import { useRecentlyViewedStore } from '@/store/recentlyViewedStore';
import { Listing } from '@/types/listing';
import { useAsync } from './useAsync';

export function useRecentlyViewed() {
  const ids = useRecentlyViewedStore((state) => state.ids);
  const clear = useRecentlyViewedStore((state) => state.clear);
  const key = ids.join(',');
  const { data, loading } = useAsync(() => listingService.getByIds(ids), [key]);

  // getByIds doesn't guarantee order, so re-sort to most-recently-viewed-first.
  const listings = useMemo(() => {
    if (!data) return [];
    const byId = new Map(data.map((listing) => [listing.id, listing]));
    return ids.map((id) => byId.get(id)).filter((listing): listing is Listing => !!listing);
  }, [data, key]);

  return { listings, loading, clear };
}
