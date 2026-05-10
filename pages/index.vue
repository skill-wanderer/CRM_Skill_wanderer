<script setup lang="ts">
import { onMounted } from 'vue';
import DashboardAlerts from '~/components/dashboard/DashboardAlerts.vue';
import LeadStats from '~/components/crm/leads/LeadStats.vue';
import { useLeadsStore } from '~/stores/leads';

const store = useLeadsStore();

// Dashboard Page
useHead({ title: 'Dashboard - SW CRM' });

onMounted(() => {
  store.fetchLeads();
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-900 mb-6">Guild Dashboard</h1>
    
    <DashboardAlerts />

    <div class="mt-8">
      <h2 class="text-lg font-medium text-slate-900 mb-4">Lead Overview</h2>
      <LeadStats />
    </div>
  </div>
</template>
