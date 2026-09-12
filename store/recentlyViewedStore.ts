import { create } from 'zustand';

const MAX_ITEMS = 20;

interface RecentlyViewedState {
  ids: string[]; // most-recent first
  record: (id: string) => void;
  clear: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>((set) => ({
  // seeded so the screen isn't empty in the prototype
  ids: ['l3', 'l1', 'l5'],

  record: (id) =>
    set((state) => ({
      ids: [id, ...state.ids.filter((existing) => existing !== id)].slice(0, MAX_ITEMS),
    })),

  clear: () => set({ ids: [] }),
}));
