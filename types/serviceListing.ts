export type PricingModel = 'Fixed' | 'Hourly' | 'Quote on request';

export interface ServiceDetail {
  listingId: string;
  serviceType: string;
  pricingModel: PricingModel;
  startingPrice?: string;
  availability: string;
  serviceArea: string;
}
