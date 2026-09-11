export type LeadType = 'call' | 'whatsapp' | 'enquiry';

export interface Lead {
  id: string;
  listingId: string;
  listingTitle: string;
  customerName: string;
  type: LeadType;
  message?: string;
  createdAt: string; // ISO date
  isNew: boolean;
}
