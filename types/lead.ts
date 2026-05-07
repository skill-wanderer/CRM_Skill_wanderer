export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost';
export type LeadPriority = 'low' | 'medium' | 'high';
export type TagCategory = 'Priority' | 'Industry' | 'Lead Type' | 'Custom';

export interface Tag {
  name: string;
  color: string; // Tailwind color identifier
  category: TagCategory;
  description?: string;
}

export interface TagAnalytics {
  tag: string;
  revenue: number;
  growth: number;
  usage: number;
  conversionRate: number;
  engagement: number;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  authorId?: string;
  authorName?: string;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'system';
  description: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  linkedinUrl?: string;
  discordUrl?: string;
  twitterUrl?: string;
  githubUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  websiteUrl?: string;
  jobTitle?: string;
  industry?: string;
  source?: string;
  score: number;
  priority: LeadPriority;
  assignedRep?: string;
  lastContacted?: string;
  nextFollowUp?: string;
  notes?: Note[];
  activities?: Activity[];
  tags: string[];
  status: LeadStatus;
  value: number;
  createdAt: string;
  updatedAt?: string;
}
