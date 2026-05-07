export interface Alert {
  id: string;
  title: string;
  description: string;
  type: 'urgent' | 'attention' | 'healthy';
  category: 'deal_risk' | 'lead_inactive' | 'follow_up';
  read: boolean;
  createdAt: string;
}
