import { Listing } from '@/types/listing';

/**
 * Category id -> detail route prefix. Categories not listed here (e.g.
 * Restaurants, Healthcare, Education, Shopping) fall back to the generic
 * 'business' detail screen.
 */
const CATEGORY_ROUTE_PREFIX: Record<string, string> = {
  c2: 'hotels',
  c3: 'properties',
  c4: 'jobs',
  c5: 'services',
};

/** Returns the right detail route for a listing based on its category. */
export function getListingRoute(listing: Pick<Listing, 'id' | 'categoryId'>): string {
  const prefix = CATEGORY_ROUTE_PREFIX[listing.categoryId] ?? 'business';
  return `/${prefix}/${listing.id}`;
}
