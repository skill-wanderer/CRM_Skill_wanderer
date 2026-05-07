<script setup lang="ts">
import { computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';

const store = useLeadsStore();

const totalLeads = computed(() => store.leads.length);
const qualifiedLeads = computed(() => store.leads.filter(l => l.status === 'qualified' || l.status === 'won').length);
const conversionRate = computed(() => {
  if (totalLeads.value === 0) return 0;
  return Math.round((store.leads.filter(l => l.status === 'won').length / totalLeads.value) * 100);
});
const followUpsToday = computed(() => store.leads.filter(l => l.priority === 'high' && l.status !== 'won' && l.status !== 'lost').length);

const stats = computed(() => [
  { name: 'Total Leads', stat: totalLeads.value, icon: '👥', color: 'text-blue-500', bg: 'bg-blue-100' },
  { name: 'Qualified Leads', stat: qualifiedLeads.value, icon: '🔥', color: 'text-orange-500', bg: 'bg-orange-100' },
  { name: 'Conversion Rate', stat: `${conversionRate.value}%`, icon: '📈', color: 'text-green-500', bg: 'bg-green-100' },
  { name: 'Follow-ups Due', stat: followUpsToday.value, icon: '⏰', color: 'text-red-500', bg: 'bg-red-100' },
]);
</script>

<template>
  <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
    <div v-for="item in stats" :key="item.name" class="relative overflow-hidden rounded-xl bg-white px-4 pt-5 pb-12 shadow-sm border border-slate-100 sm:px-6 sm:pt-6 transition-all hover:shadow-md">
      <dt>
        <div class="absolute rounded-md p-3" :class="item.bg">
          <span class="text-xl" :class="item.color">{{ item.icon }}</span>
        </div>
        <p class="ml-16 truncate text-sm font-medium text-slate-500">{{ item.name }}</p>
      </dt>
      <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
        <p class="text-2xl font-semibold text-slate-900">{{ item.stat }}</p>
      </dd>
    </div>
  </dl>
</template>
