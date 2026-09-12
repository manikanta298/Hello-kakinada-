import { mockWorkingHours } from '@/data/mockWorkingHours';
import { DayHours } from '@/types/workingHours';
import { wait } from './_shared';

export const workingHoursService = {
  /** Every listing shares the same mock hours for now — swap to a per-listing
   * lookup once the real API returns per-listing hours. */
  async getForListing(_listingId: string): Promise<DayHours[]> {
    await wait();
    return mockWorkingHours;
  },
};
