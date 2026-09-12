export type ReportReason =
  | 'Incorrect information'
  | 'Listing is closed / doesn\u2019t exist'
  | 'Spam or scam'
  | 'Inappropriate content'
  | 'Duplicate listing'
  | 'Other';

export const REPORT_REASONS: ReportReason[] = [
  'Incorrect information',
  'Listing is closed / doesn\u2019t exist',
  'Spam or scam',
  'Inappropriate content',
  'Duplicate listing',
  'Other',
];
