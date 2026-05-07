import { useLeadsStore } from '~/stores/leads';
import type { Lead } from '~/types/lead';

export function useLeadActions() {
  const store = useLeadsStore();

  const notify = (message: string) => {
    // Basic toast mock
    // In a real app we'd use a Toast store or plugin
    alert(message);
  };

  const saveLead = async (id: string, updates: Partial<Lead>) => {
    store.updateLead(id, updates);
    notify('Lead saved successfully!');
  };

  const addTag = async (id: string, tag: string) => {
    const lead = store.leads.find(l => l.id === id);
    if (lead && !lead.tags.includes(tag)) {
      store.updateTags(id, [...lead.tags, tag]);
    }
  };

  const removeTag = async (id: string, tag: string) => {
    const lead = store.leads.find(l => l.id === id);
    if (lead) {
      store.updateTags(id, lead.tags.filter(t => t !== tag));
    }
  };

  const createNote = async (id: string, content: string) => {
    store.addNote(id, content);
  };

  return {
    saveLead,
    addTag,
    removeTag,
    createNote,
  };
}
