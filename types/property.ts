export type PropertyType = 'Apartment' | 'House' | 'Plot' | 'Commercial';
export type ListingIntent = 'rent' | 'sale';
export type Furnishing = 'Furnished' | 'Semi-furnished' | 'Unfurnished';

export interface PropertyDetail {
  listingId: string;
  propertyType: PropertyType;
  intent: ListingIntent;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  furnishing: Furnishing;
  amenities: string[];
}
