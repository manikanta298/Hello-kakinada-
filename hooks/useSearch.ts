import { listingService } from '@/services';
import { useSearchStore } from '@/store/searchStore';
import { useAsync } from './useAsync';

export function useSearch() {
  const { query, setQuery, filters, setFilters, resetFilters, activeFilterCount } = useSearchStore();
  const { data, loading } = useAsync(() => listingService.search(query, filters), [query, filters]);

  return {
    query,
    setQuery,
    filters,
    setFilters,
    resetFilters,
    activeFilterCount,
    results: data ?? [],
    loading,
  };
}
