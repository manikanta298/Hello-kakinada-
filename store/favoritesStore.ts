import { create } from 'zustand';

interface FavoritesState {
  ids: Set<string>;
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: new Set(['l1', 'l5']), // seeded so the Saved tab isn't empty in the prototype

  toggle: (id) =>
    set((state) => {
      const next = new Set(state.ids);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ids: next };
    }),

  isFavorite: (id) => get().ids.has(id),
}));
