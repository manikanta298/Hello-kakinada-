import { mockJobDetails } from '@/data/mockJobDetails';
import { JobDetail } from '@/types/job';
import { wait } from './_shared';

export const jobService = {
  async getDetail(listingId: string): Promise<JobDetail | undefined> {
    await wait();
    return mockJobDetails.find((j) => j.listingId === listingId);
  },
};
