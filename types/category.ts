export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string; // icon name (Ionicons/MaterialIcons key)
  listingCount?: number;
}
