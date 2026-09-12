/**
 * Single import point for the whole app. Screens should import from
 * '@/services', never reach into '@/data/mock*' or '@/services/mock/*'
 * directly — that indirection is what lets us swap mocks for a real
 * backend later by changing only this file.
 */
import {
  categoryService,
  listingService,
  reviewService,
  workingHoursService,
  ownerService,
  notificationService,
  jobService,
  propertyService,
  hotelService,
  serviceListingService,
  reportService,
} from './mock';

// Flip to false once services/api/* is implemented against a real backend.
const USE_MOCKS = true;

if (!USE_MOCKS) {
  throw new Error('services/api is not implemented yet — set USE_MOCKS back to true.');
}

export {
  categoryService,
  listingService,
  reviewService,
  workingHoursService,
  ownerService,
  notificationService,
  jobService,
  propertyService,
  hotelService,
  serviceListingService,
  reportService,
};
