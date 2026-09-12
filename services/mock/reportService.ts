import { ReportReason } from '@/types/report';
import { wait } from './_shared';

export const reportService = {
  async submit(listingId: string, reason: ReportReason, details: string): Promise<void> {
    await wait();
    // Prototype only — nothing persisted server-side yet.
    console.log('[reportService] submitted', { listingId, reason, details });
  },
};
