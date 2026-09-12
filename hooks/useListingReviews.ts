import { listingService, reviewService } from '@/services';
import { useAsync } from './useAsync';

export function useListingReviews(listingId: string) {
  const { data, loading } = useAsync(async () => {
    const [listing, reviews] = await Promise.all([
      listingService.getById(listingId),
      reviewService.getByListingId(listingId),
    ]);
    return { listing: listing ?? null, reviews };
  }, [listingId]);

  const reviews = data?.reviews ?? [];
  const average =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : (data?.listing?.rating ?? 0);

  return { listing: data?.listing ?? null, reviews, average, loading };
}
