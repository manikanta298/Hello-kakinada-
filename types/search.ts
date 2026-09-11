export type SortOption = 'relevance' | 'rating' | 'distance' | 'newest';

export interface SearchFilters {
  categoryId?: string;
  minRating?: number;
  verifiedOnly?: boolean;
  sortBy: SortOption;
}

export const defaultFilters: SearchFilters = {
  sortBy: 'relevance',
};
