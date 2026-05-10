<script setup lang="ts">
import { onMounted } from 'vue';
import LeadTable from '~/components/crm/leads/LeadTable.vue';
import LeadFilters from '~/components/crm/leads/LeadFilters.vue';
import LeadStats from '~/components/crm/leads/LeadStats.vue';
import TagInsights from '~/components/analytics/TagInsights.vue';
import LeadDrawer from '~/components/crm/leads/LeadDrawer.vue';
import LeadForm from '~/components/crm/leads/LeadForm.vue';
import UiButton from '~/components/ui/Button.vue';
import { useLeadsStore } from '~/stores/leads';

const store = useLeadsStore();

useHead({ title: 'Leads - SW CRM' });

onMounted(() => {
  store.fetchLeads();
});
</script>

<template>
  <div>
    <div class="sm:flex sm:items-center sm:justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Leads Management</h1>
        <p class="text-slate-500 text-sm mt-1">Manage and track your prospective customers through the pipeline.</p>
      </div>
      <div class="mt-4 sm:mt-0 flex gap-3">
        <UiButton variant="secondary" @click="store.fetchLeads()">Refresh</UiButton>
        <UiButton variant="primary" @click="store.isFormOpen = true">Add Lead</UiButton>
      </div>
    </div>
    
    <!-- Stats & Analytics Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      <div class="lg:col-span-3">
        <LeadStats />
      </div>
      <div>
        <TagInsights />
      </div>
    </div>
    <LeadFilters />
    <LeadTable />
    <LeadDrawer />
    <LeadForm />
  </div>
</template>
