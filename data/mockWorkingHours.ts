export interface DayHours {
  day: string;
  hours: string; // e.g. "9:00 AM – 10:00 PM" or "Closed"
}

export const mockWorkingHours: DayHours[] = [
  { day: 'Monday', hours: '10:00 AM – 10:00 PM' },
  { day: 'Tuesday', hours: '10:00 AM – 10:00 PM' },
  { day: 'Wednesday', hours: '10:00 AM – 10:00 PM' },
  { day: 'Thursday', hours: '10:00 AM – 10:00 PM' },
  { day: 'Friday', hours: '10:00 AM – 11:00 PM' },
  { day: 'Saturday', hours: '10:00 AM – 11:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];
