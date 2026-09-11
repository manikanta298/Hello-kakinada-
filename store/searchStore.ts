import { create } from 'zustand';
import { SearchFilters, defaultFilters } from '@/types/search';

interface SearchState {
  query: string;
  filters: SearchFilters;
  setQuery: (query: string) => void;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  activeFilterCount: () => number;
}

export const useSearchStore = create<SearchState>((set, get) => ({
  query: '',
  filters: defaultFilters,

  setQuery: (query) => set({ query }),

  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),

  resetFilters: () => set({ filters: defaultFilters }),

  activeFilterCount: () => {
    const { categoryId, minRating, verifiedOnly, sortBy } = get().filters;
    let count = 0;
    if (categoryId) count += 1;
    if (minRating) count += 1;
    if (verifiedOnly) count += 1;
    if (sortBy !== 'relevance') count += 1;
    return count;
  },
}));
