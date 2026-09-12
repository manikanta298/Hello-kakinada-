import { useEffect, useState } from 'react';
import { ownerService } from '@/services';
import { OwnerListing } from '@/types/owner';

export function useOwnerListings() {
  const [listings, setListings] = useState<OwnerListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    ownerService.getListings().then((result) => {
      if (cancelled) return;
      setListings(result);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const remove = (id: string) => {
    setListings((prev) => prev.filter((listing) => listing.id !== id));
    ownerService.deleteListing(id);
  };

  return { listings, loading, remove };
}
