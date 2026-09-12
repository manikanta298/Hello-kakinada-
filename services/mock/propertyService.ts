import { mockPropertyDetails } from '@/data/mockPropertyDetails';
import { PropertyDetail } from '@/types/property';
import { wait } from './_shared';

export const propertyService = {
  async getDetail(listingId: string): Promise<PropertyDetail | undefined> {
    await wait();
    return mockPropertyDetails.find((p) => p.listingId === listingId);
  },
};
