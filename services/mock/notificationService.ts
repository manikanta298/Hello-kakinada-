import { mockNotifications } from '@/data/mockNotifications';
import { AppNotification } from '@/types/notification';
import { wait } from './_shared';

// Mutated in place so read state persists for the session, mirroring how
// ownerService.deleteListing treats its mock array as session-local state.
const notifications: AppNotification[] = [...mockNotifications];

export const notificationService = {
  async getAll(): Promise<AppNotification[]> {
    await wait();
    return notifications;
  },

  async markRead(id: string): Promise<void> {
    await wait();
    const item = notifications.find((n) => n.id === id);
    if (item) item.isRead = true;
  },

  async markAllRead(): Promise<void> {
    await wait();
    notifications.forEach((n) => (n.isRead = true));
  },
};
