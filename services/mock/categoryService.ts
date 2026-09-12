import { mockCategories } from '@/data/mockCategories';
import { Category } from '@/types/category';
import { wait } from './_shared';

export const categoryService = {
  async getAll(): Promise<Category[]> {
    await wait();
    return mockCategories;
  },

  async getById(id: string): Promise<Category | undefined> {
    await wait();
    return mockCategories.find((c) => c.id === id);
  },

  async getBySlug(slug: string): Promise<Category | undefined> {
    await wait();
    return mockCategories.find((c) => c.slug === slug);
  },
};
