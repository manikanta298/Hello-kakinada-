import { create } from 'zustand';

interface PostListingState {
  categoryId?: string;
  title: string;
  description: string;
  price: string;
  address: string;
  phone: string;
  whatsapp: boolean;
  photos: string[]; // local URIs; empty string = placeholder slot
  setCategory: (categoryId: string) => void;
  setDetails: (fields: Partial<Pick<PostListingState, 'title' | 'description' | 'price'>>) => void;
  setLocation: (fields: Partial<Pick<PostListingState, 'address' | 'phone' | 'whatsapp'>>) => void;
  addPhoto: (uri: string) => void;
  removePhoto: (index: number) => void;
  reset: () => void;
}

const initial = {
  categoryId: undefined,
  title: '',
  description: '',
  price: '',
  address: '',
  phone: '',
  whatsapp: false,
  photos: [],
};

export const usePostListingStore = create<PostListingState>((set) => ({
  ...initial,

  setCategory: (categoryId) => set({ categoryId }),
  setDetails: (fields) => set((state) => ({ ...state, ...fields })),
  setLocation: (fields) => set((state) => ({ ...state, ...fields })),
  addPhoto: (uri) => set((state) => ({ photos: [...state.photos, uri] })),
  removePhoto: (index) =>
    set((state) => ({ photos: state.photos.filter((_, i) => i !== index) })),
  reset: () => set(initial),
}));
