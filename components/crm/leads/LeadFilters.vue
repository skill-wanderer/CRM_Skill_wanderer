<script setup lang="ts">
import { ref, watch } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import UiButton from '~/components/ui/Button.vue';
import TagFilterBar from './TagFilterBar.vue';

const store = useLeadsStore();

const statuses = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal_sent', label: 'Proposal Sent' },
  { value: 'negotiation', label: 'Negotiation' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
];

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

// Single-select proxy for status (maps to the store's array)
const selectedStatus = ref<string>('');
watch(selectedStatus, (val) => {
  store.filters.status = val ? [val as any] : [];
});

const clearFilters = () => {
  store.filters.search = '';
  store.filters.status = [];
  store.filters.priority = null;
  store.filters.owner = null;
  selectedStatus.value = '';
};
</script>

<template>
  <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row gap-4 items-center">
    <div class="flex-1 w-full sm:w-auto relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span class="text-slate-400">🔍</span>
      </div>
      <input 
        v-model="store.filters.search"
        type="text" 
        class="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md leading-5 bg-white placeholder-slate-500 focus:outline-none focus:placeholder-slate-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Search leads by name, company, or email..."
      >
    </div>
    
    <div class="flex gap-2 w-full sm:w-auto">
      <select 
        v-model="selectedStatus"
        class="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="">All Statuses</option>
        <option v-for="s in statuses" :key="s.value" :value="s.value">{{ s.label }}</option>
      </select>
      
      <select 
        v-model="store.filters.priority"
        class="block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option :value="null">All Priorities</option>
        <option v-for="p in priorities" :key="p.value" :value="p.value">{{ p.label }}</option>
      </select>
      
      <UiButton variant="secondary" @click="clearFilters">Clear</UiButton>
    </div>

    <!-- Tag Filter Bar -->
    <div class="mt-4">
      <TagFilterBar />
    </div>
  </div>
</template>
