import { OwnerListing } from '@/types/owner';

export const mockOwnerListings: OwnerListing[] = [
  {
    id: 'l1',
    title: 'Sea Pearl Restaurant',
    categoryName: 'Restaurants',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    status: 'active',
    views: 1284,
    leadCount: 23,
  },
  {
    id: 'l5',
    title: 'QuickFix Electricians',
    categoryName: 'Services',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
    status: 'active',
    views: 642,
    leadCount: 14,
  },
  {
    id: 'l9',
    title: 'Sea Pearl — Banquet Hall',
    categoryName: 'Services',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
    status: 'pending',
    views: 0,
    leadCount: 0,
  },
  {
    id: 'l10',
    title: 'Sea Pearl — Catering',
    categoryName: 'Services',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800',
    status: 'paused',
    views: 318,
    leadCount: 5,
  },
];
