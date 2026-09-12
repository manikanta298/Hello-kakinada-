import { useCallback, useEffect, useState } from 'react';
import { notificationService } from '@/services';
import { AppNotification } from '@/types/notification';

export function useNotifications() {
  const [items, setItems] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    notificationService.getAll().then((result) => {
      setItems(result);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = (id: string) => notificationService.markRead(id).then(load);
  const markAllRead = () => notificationService.markAllRead().then(load);
  const unreadCount = items.filter((item) => !item.isRead).length;

  return { items, loading, markRead, markAllRead, unreadCount };
}
