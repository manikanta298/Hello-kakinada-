import { Lead } from '@/types/lead';

export const mockLeads: Lead[] = [
  {
    id: 'e1',
    listingId: 'l1',
    listingTitle: 'Sea Pearl Restaurant',
    customerName: 'Venkat Rao',
    type: 'call',
    createdAt: '2026-09-11T09:12:00',
    isNew: true,
  },
  {
    id: 'e2',
    listingId: 'l1',
    listingTitle: 'Sea Pearl Restaurant',
    customerName: 'Divya Sri',
    type: 'whatsapp',
    createdAt: '2026-09-10T18:40:00',
    isNew: true,
  },
  {
    id: 'e3',
    listingId: 'l5',
    listingTitle: 'QuickFix Electricians',
    customerName: 'Suresh Babu',
    type: 'enquiry',
    message: 'Do you handle inverter installation as well?',
    createdAt: '2026-09-10T14:05:00',
    isNew: false,
  },
  {
    id: 'e4',
    listingId: 'l5',
    listingTitle: 'QuickFix Electricians',
    customerName: 'Lakshmi Prasanna',
    type: 'call',
    createdAt: '2026-09-09T11:22:00',
    isNew: false,
  },
];
