export interface Review {
  id: string;
  listingId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string; // ISO date
}
