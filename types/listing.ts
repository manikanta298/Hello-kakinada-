export interface Listing {
  id: string;
  title: string;
  categoryId: string;
  categoryName: string;
  description: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  location: string;
  distance?: number;
  phone?: string;
  whatsapp?: boolean;
  verified?: boolean;
  price?: string;
  latitude?: number;
  longitude?: number;
}
