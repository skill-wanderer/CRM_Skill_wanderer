import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Lead, LeadStatus, LeadPriority, Tag } from '~/types/lead';

export type InsightTab = 'Usage' | 'Conversion' | 'Engagement' | 'Revenue' | 'Growth';

export const useLeadsStore = defineStore('leads', () => {
  const leads = ref<Lead[]>([]);
  const selectedLeads = ref<string[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // --- New analytics tab state ---
  const activeInsightTab = ref<'Usage'|'Conversion'|'Engagement'|'Revenue'|'Growth'>('Usage');
  function setInsightTab(tab: typeof activeInsightTab.value) {
    activeInsightTab.value = tab;
  }

  const globalTags = ref<Tag[]>([
    { name: 'High Priority', color: 'red', category: 'Priority' },
    { name: 'VIP', color: 'amber', category: 'Priority' },
    { name: 'SaaS', color: 'purple', category: 'Industry' },
    { name: 'Investor', color: 'emerald', category: 'Lead Type' },
    { name: 'Startup', color: 'blue', category: 'Lead Type' },
    { name: 'Hot Lead', color: 'orange', category: 'Priority' },
    { name: 'B2B', color: 'indigo', category: 'Industry' },
    { name: 'Enterprise', color: 'slate', category: 'Lead Type' },
  ]);

  const filters = ref({
    search: '',
    status: [] as LeadStatus[],
    owner: null as string | null,
    priority: null as LeadPriority | null,
    tagNames: [] as string[],
  });

  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
  });

  const sorting = ref({
    column: 'createdAt' as keyof Lead,
    direction: 'desc' as 'asc' | 'desc',
  });

  const isDrawerOpen = ref(false);
  const isFormOpen = ref(false);
  const selectedLeadId = ref<string | null>(null);

  async function fetchLeads() {
    isLoading.value = true;
    error.value = null;
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockData: Lead[] = [
        { id: '1', name: 'Alice Smith', company: 'TechCorp', email: 'alice@techcorp.com', phone: '+1 555-0101', score: 85, priority: 'high', status: 'won', value: 150000, tags: ['B2B', 'SaaS', 'High Priority'], assignedRep: 'John Doe', createdAt: new Date(Date.now() - 86400000).toISOString(), notes: [{id: 'n1', content: 'note', createdAt: 'date'}], activities: [{id: 'a1', type: 'call', description: 'call', createdAt: 'date'}], linkedinUrl: 'https://linkedin.com/in/alicesmith', twitterUrl: 'https://twitter.com/alicesmith', githubUrl: 'https://github.com/alicesmith' },
        { id: '2', name: 'Bob Jones', company: 'Global Solutions', email: 'bob@global.com', phone: '+1 555-0102', score: 65, priority: 'medium', status: 'qualified', value: 45000, tags: ['Enterprise', 'VIP'], assignedRep: 'Jane Smith', createdAt: new Date(Date.now() - 172800000).toISOString() },
        { id: '3', name: 'Charlie Brown', company: 'StartUp Inc', email: 'charlie@startup.io', phone: '+1 555-0103', score: 40, priority: 'low', status: 'contacted', value: 5000, tags: ['Startup', 'Hot Lead'], assignedRep: 'John Doe', createdAt: new Date().toISOString() },
        { id: '4', name: 'Diana Prince', company: 'Amazonia LLC', email: 'diana@amazonia.com', phone: '+1 555-0104', score: 95, priority: 'high', status: 'won', value: 120000, tags: ['SaaS', 'Investor'], assignedRep: 'Sarah Connor', createdAt: new Date(Date.now() - 259200000).toISOString(), notes: [{id: 'n2', content: 'note', createdAt: 'date'}, {id: 'n3', content: 'note', createdAt: 'date'}] },
        { id: '5', name: 'Evan Wright', company: 'Wright Corp', email: 'evan@wright.com', phone: '+1 555-0105', score: 50, priority: 'medium', status: 'negotiation', value: 25000, tags: ['B2B'], assignedRep: 'John Doe', createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString() }, // >30 days ago to show growth
      ];

      leads.value = mockData;
      pagination.value.total = mockData.length;
    } catch (e: any) {
      error.value = e.message;
    } finally {
      isLoading.value = false;
    }
  }

  function updateLead(id: string, updates: Partial<Lead>) {
    const index = leads.value.findIndex(l => l.id === id);
    if (index !== -1) {
      leads.value[index] = { ...leads.value[index], ...updates, updatedAt: new Date().toISOString() };
    }
  }

  function addNote(leadId: string, content: string) {
    const index = leads.value.findIndex(l => l.id === leadId);
    if (index !== -1) {
      const lead = leads.value[index];
      const newNote = {
        id: String(Date.now()),
        content,
        createdAt: new Date().toISOString(),
        authorName: 'Current User',
      };
      if (!lead.notes) lead.notes = [];
      lead.notes.unshift(newNote);
    }
  }

  function updateTags(leadId: string, tags: string[]) {
    const index = leads.value.findIndex(l => l.id === leadId);
    if (index !== -1) {
      leads.value[index].tags = tags;
    }
  }

  function addGlobalTag(tag: Tag) {
    if (!globalTags.value.find(t => t.name === tag.name)) {
      globalTags.value.push(tag);
    }
  }

  function updateGlobalTag(name: string, updates: Partial<Tag>) {
    const index = globalTags.value.findIndex(t => t.name === name);
    if (index !== -1) {
      globalTags.value[index] = { ...globalTags.value[index], ...updates };
    }
  }

  function deleteGlobalTag(name: string) {
    globalTags.value = globalTags.value.filter(t => t.name !== name);
    // Also remove from all leads
    leads.value.forEach(lead => {
      lead.tags = lead.tags.filter(t => t !== name);
    });
  }

  function toggleLeadTag(leadId: string, tagName: string) {
    const lead = leads.value.find(l => l.id === leadId);
    if (lead) {
      if (lead.tags.includes(tagName)) {
        lead.tags = lead.tags.filter(t => t !== tagName);
      } else {
        lead.tags.push(tagName);
      }
    }
  }

  async function deleteLead(id: string) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 600));
    
    leads.value = leads.value.filter(l => l.id !== id);
    selectedLeads.value = selectedLeads.value.filter(leadId => leadId !== id);
    pagination.value.total = leads.value.length;
    
    if (selectedLeadId.value === id) {
      selectedLeadId.value = null;
      isDrawerOpen.value = false;
    }
  }

  return {
    leads,
    selectedLeads,
    isLoading,
    error,
    filters,
    pagination,
    sorting,
    isDrawerOpen,
    isFormOpen,
    selectedLeadId,
    fetchLeads,
    updateLead,
    addNote,
    updateTags,
    globalTags,
    addGlobalTag,
    updateGlobalTag,
    deleteGlobalTag,
    toggleLeadTag,
    deleteLead,
    // New analytics tab state
    activeInsightTab,
    setInsightTab,
  };
});

