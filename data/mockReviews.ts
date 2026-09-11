import { Review } from '@/types/review';

export const mockReviews: Review[] = [
  {
    id: 'r1',
    listingId: 'l1',
    userName: 'Priya Sharma',
    rating: 5,
    comment: 'Excellent seafood and quick service. The prawn curry was outstanding — will definitely come back.',
    date: '2025-08-14',
  },
  {
    id: 'r2',
    listingId: 'l1',
    userName: 'Rakesh Varma',
    rating: 4,
    comment: 'Good ambience and friendly staff. Slightly pricey but worth it for special occasions.',
    date: '2025-07-30',
  },
  {
    id: 'r3',
    listingId: 'l1',
    userName: 'Anjali Devi',
    rating: 5,
    comment: 'Best coastal food in Kakinada. Highly recommend the fish fry.',
    date: '2025-07-02',
  },
];
