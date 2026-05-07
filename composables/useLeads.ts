import { storeToRefs } from 'pinia';
import { useAsyncData } from '#imports';
import { useLeadsStore } from '~/stores/leads';

export function useLeads() {
  const store = useLeadsStore();
  const { leads, isLoading, error } = storeToRefs(store);

  const loadLeads = async () => {
    if (leads.value.length === 0) {
      await useAsyncData('leads-fetch', () => store.fetchLeads());
    }
  };

  return {
    leads,
    isLoading,
    error,
    loadLeads
  };
}
