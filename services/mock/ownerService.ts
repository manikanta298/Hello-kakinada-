import { mockOwnerListings } from '@/data/mockOwnerListings';
import { mockLeads } from '@/data/mockLeads';
import { mockSubscription } from '@/data/mockSubscription';
import { Lead } from '@/types/lead';
import { OwnerListing, Subscription } from '@/types/owner';
import { wait } from './_shared';

export const ownerService = {
  async getListings(): Promise<OwnerListing[]> {
    await wait();
    return mockOwnerListings;
  },

  async deleteListing(id: string): Promise<void> {
    await wait();
    // No-op against the static mock array — screens optimistically remove the
    // item from their own local state. Swap for a real DELETE once the API
    // service lands.
  },

  async getLeads(): Promise<Lead[]> {
    await wait();
    return mockLeads;
  },

  async getRecentLeads(count: number): Promise<Lead[]> {
    await wait();
    return mockLeads.slice(0, count);
  },

  async getSubscription(): Promise<Subscription> {
    await wait();
    return mockSubscription;
  },
};
