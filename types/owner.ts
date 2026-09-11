export type ListingStatus = 'active' | 'pending' | 'paused' | 'rejected';

export interface OwnerListing {
  id: string;
  title: string;
  categoryName: string;
  image: string;
  status: ListingStatus;
  views: number;
  leadCount: number;
}

export type SubscriptionPlan = 'free' | 'basic' | 'premium';

export interface Subscription {
  plan: SubscriptionPlan;
  planLabel: string;
  renewsOn: string; // ISO date
  listingLimit: number;
  listingsUsed: number;
}
