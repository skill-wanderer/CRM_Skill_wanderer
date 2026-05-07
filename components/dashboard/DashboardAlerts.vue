<script setup lang="ts">
import { useAlertsStore } from '~/stores/alerts';
import AlertCard from './AlertCard.vue';

const alertsStore = useAlertsStore();

const handleAction = (id: string) => {
  // In a real app, this might navigate to the specific deal/lead or open a modal
  alertsStore.markAsRead(id);
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    
    <!-- Deals at Risk -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between border-b border-slate-200 pb-2">
        <h2 class="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-red-500"></span>
          Deals at Risk
        </h2>
        <span class="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
          {{ alertsStore.dealsAtRisk.length }}
        </span>
      </div>
      <div v-if="alertsStore.dealsAtRisk.length === 0" class="text-sm text-slate-500 italic py-4">
        No deals currently at risk.
      </div>
      <AlertCard 
        v-for="alert in alertsStore.dealsAtRisk" 
        :key="alert.id" 
        :alert="alert"
        @action="handleAction"
      />
    </div>

    <!-- Inactive Leads -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between border-b border-slate-200 pb-2">
        <h2 class="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-amber-500"></span>
          Inactive Leads (3+ Days)
        </h2>
        <span class="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
          {{ alertsStore.inactiveLeads.length }}
        </span>
      </div>
      <div v-if="alertsStore.inactiveLeads.length === 0" class="text-sm text-slate-500 italic py-4">
        All leads have recent activity.
      </div>
      <AlertCard 
        v-for="alert in alertsStore.inactiveLeads" 
        :key="alert.id" 
        :alert="alert"
        @action="handleAction"
      />
    </div>

    <!-- Follow-ups Due -->
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between border-b border-slate-200 pb-2">
        <h2 class="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-green-500"></span>
          Follow-ups Due Today
        </h2>
        <span class="bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">
          {{ alertsStore.dueFollowUps.length }}
        </span>
      </div>
      <div v-if="alertsStore.dueFollowUps.length === 0" class="text-sm text-slate-500 italic py-4">
        No follow-ups scheduled for today.
      </div>
      <AlertCard 
        v-for="alert in alertsStore.dueFollowUps" 
        :key="alert.id" 
        :alert="alert"
        @action="handleAction"
      />
    </div>

  </div>
</template>
