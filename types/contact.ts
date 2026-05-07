export interface DynamicField {
  key: string;
  label: string;
  value: string;
  type: 'text' | 'email' | 'phone' | 'url' | 'textarea';
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  status: 'Lead' | 'Qualified' | 'Prospect' | 'Customer' | 'Lost';
  lastContacted: string | null;
  owner: string;
  tags: string[];
  avatarUrl?: string;
  fields: DynamicField[];
}
