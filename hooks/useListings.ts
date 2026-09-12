import { listingService } from '@/services';
import { useAsync } from './useAsync';

export function useAllListings() {
  const { data, loading } = useAsync(() => listingService.getAll(), []);
  return { listings: data ?? [], loading };
}

export function useTrendingListings() {
  const { data, loading } = useAsync(() => listingService.getTrending(), []);
  return { listings: data ?? [], loading };
}

export function useNearbyListings() {
  const { data, loading } = useAsync(() => listingService.getNearby(), []);
  return { listings: data ?? [], loading };
}

export function useListingsByCategory(categoryId: string) {
  const { data, loading } = useAsync(() => listingService.getByCategory(categoryId), [categoryId]);
  return { listings: data ?? [], loading };
}

export function useListingsByIds(ids: string[]) {
  const key = ids.join(',');
  const { data, loading } = useAsync(() => listingService.getByIds(ids), [key]);
  return { listings: data ?? [], loading };
}
