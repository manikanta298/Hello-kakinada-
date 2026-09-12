import { categoryService } from '@/services';
import { useAsync } from './useAsync';

export function useCategories() {
  const { data, loading } = useAsync(() => categoryService.getAll(), []);
  return { categories: data ?? [], loading };
}

export function useCategory(slug: string) {
  const { data, loading } = useAsync(() => categoryService.getBySlug(slug), [slug]);
  return { category: data ?? null, loading };
}
