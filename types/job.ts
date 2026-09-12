export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export interface JobDetail {
  listingId: string;
  company: string;
  jobType: JobType;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  skills: string[];
  postedAt: string;
}
