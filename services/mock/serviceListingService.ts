import { mockServiceDetails } from '@/data/mockServiceDetails';
import { ServiceDetail } from '@/types/serviceListing';
import { wait } from './_shared';

export const serviceListingService = {
  async getDetail(listingId: string): Promise<ServiceDetail | undefined> {
    await wait();
    return mockServiceDetails.find((s) => s.listingId === listingId);
  },
};
