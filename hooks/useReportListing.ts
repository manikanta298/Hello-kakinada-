import { useState } from 'react';
import { reportService } from '@/services';
import { ReportReason } from '@/types/report';

export function useReportListing(listingId: string) {
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submit = async () => {
    if (!reason) return;
    setSubmitting(true);
    await reportService.submit(listingId, reason, details.trim());
    setSubmitting(false);
    setSubmitted(true);
  };

  return { reason, setReason, details, setDetails, submitting, submitted, submit };
}
