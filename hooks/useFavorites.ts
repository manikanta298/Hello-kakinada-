import { useFavoritesStore } from '@/store/favoritesStore';
import { useListingsByIds } from './useListings';

export function useFavorites() {
  const { ids, toggle, isFavorite } = useFavoritesStore();
  const { listings, loading } = useListingsByIds(Array.from(ids));
  return { savedListings: listings, loading, toggle, isFavorite };
}
