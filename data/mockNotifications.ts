import { AppNotification } from '@/types/notification';

export const mockNotifications: AppNotification[] = [
  {
    id: 'n1',
    type: 'lead',
    title: 'New lead on Sea Pearl Restaurant',
    body: 'Venkat Rao called your business just now.',
    createdAt: '2026-09-12T09:12:00',
    isRead: false,
  },
  {
    id: 'n2',
    type: 'listing',
    title: 'Listing approved',
    body: '"Sea Pearl — Banquet Hall" is now live on Hello Kakinada.',
    createdAt: '2026-09-11T18:40:00',
    isRead: false,
  },
  {
    id: 'n3',
    type: 'promo',
    title: 'Upgrade to Pro',
    body: 'Get featured placement and unlimited photos this month.',
    createdAt: '2026-09-10T08:00:00',
    isRead: true,
  },
  {
    id: 'n4',
    type: 'system',
    title: 'Welcome to Hello Kakinada',
    body: 'Explore local businesses, jobs, and properties near you.',
    createdAt: '2026-09-08T12:00:00',
    isRead: true,
  },
];
