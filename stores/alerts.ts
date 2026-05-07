import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Alert } from '~/types/alert';

export const useAlertsStore = defineStore('alerts', () => {
  const alerts = ref<Alert[]>([]);
  const isLoading = ref(false);

  // Getters
  const unreadCount = computed(() => alerts.value.filter(a => !a.read).length);
  
  const dealsAtRisk = computed(() => 
    alerts.value.filter(a => a.category === 'deal_risk')
  );
  
  const inactiveLeads = computed(() => 
    alerts.value.filter(a => a.category === 'lead_inactive')
  );
  
  const dueFollowUps = computed(() => 
    alerts.value.filter(a => a.category === 'follow_up')
  );

  // Actions
  async function fetchAlerts() {
    isLoading.value = true;
    try {
      // Mock fetching alerts
      await new Promise(resolve => setTimeout(resolve, 500));
      
      alerts.value = [
        {
          id: '1',
          title: 'High Value Deal at Risk',
          description: 'Global Solutions deal ($45k) has been stalled in negotiation for 14 days.',
          type: 'urgent',
          category: 'deal_risk',
          read: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Contract Pending',
          description: 'TechCorp is waiting for contract revisions.',
          type: 'attention',
          category: 'deal_risk',
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        },
        {
          id: '3',
          title: 'Alice Smith - No Activity',
          description: 'No communication with Alice Smith for 5 days.',
          type: 'attention',
          category: 'lead_inactive',
          read: false,
          createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: '4',
          title: 'Bob Jones - Stale Lead',
          description: 'Bob Jones has not opened the last 3 emails.',
          type: 'attention',
          category: 'lead_inactive',
          read: true,
          createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
        },
        {
          id: '5',
          title: 'Call Charlie Brown',
          description: 'Scheduled follow-up call at 2:00 PM.',
          type: 'healthy',
          category: 'follow_up',
          read: false,
          createdAt: new Date().toISOString()
        },
        {
          id: '6',
          title: 'Send Proposal to StartUp Inc',
          description: 'Proposal due today for the new project scope.',
          type: 'urgent',
          category: 'follow_up',
          read: false,
          createdAt: new Date().toISOString()
        }
      ];
    } finally {
      isLoading.value = false;
    }
  }

  function markAsRead(id: string) {
    const alert = alerts.value.find(a => a.id === id);
    if (alert) {
      alert.read = true;
    }
  }

  function markAllAsRead() {
    alerts.value.forEach(a => a.read = true);
  }

  return { 
    alerts, 
    isLoading, 
    unreadCount, 
    dealsAtRisk, 
    inactiveLeads, 
    dueFollowUps,
    fetchAlerts,
    markAsRead,
    markAllAsRead
  };
});
