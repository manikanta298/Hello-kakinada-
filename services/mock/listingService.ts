import { mockListings } from '@/data/mockListings';
import { Listing } from '@/types/listing';
import { SearchFilters } from '@/types/search';
import { wait } from './_shared';

export const listingService = {
  async getAll(): Promise<Listing[]> {
    await wait();
    return mockListings;
  },

  async getById(id: string): Promise<Listing | undefined> {
    await wait();
    return mockListings.find((l) => l.id === id);
  },

  async getByIds(ids: string[]): Promise<Listing[]> {
    await wait();
    const idSet = new Set(ids);
    return mockListings.filter((l) => idSet.has(l.id));
  },

  async getByCategory(categoryId: string): Promise<Listing[]> {
    await wait();
    return mockListings.filter((l) => l.categoryId === categoryId);
  },

  /** Highest rated first — used for the Explore "Top Rated" rail. */
  async getTrending(): Promise<Listing[]> {
    await wait();
    return [...mockListings].sort((a, b) => b.rating - a.rating);
  },

  /** Closest first — used for the Explore "Nearby You" rail. */
  async getNearby(): Promise<Listing[]> {
    await wait();
    return [...mockListings].sort((a, b) => (a.distance ?? 99) - (b.distance ?? 99));
  },

  /** Text query + filter/sort, matching the logic search/index.tsx used to do inline. */
  async search(query: string, filters: SearchFilters): Promise<Listing[]> {
    await wait();
    let list = mockListings;

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.categoryName.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q)
      );
    }

    if (filters.categoryId) {
      list = list.filter((l) => l.categoryId === filters.categoryId);
    }
    if (filters.minRating) {
      list = list.filter((l) => l.rating >= filters.minRating!);
    }
    if (filters.verifiedOnly) {
      list = list.filter((l) => l.verified);
    }

    const sorted = [...list];
    if (filters.sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    if (filters.sortBy === 'distance') sorted.sort((a, b) => (a.distance ?? 99) - (b.distance ?? 99));

    return sorted;
  },
};
