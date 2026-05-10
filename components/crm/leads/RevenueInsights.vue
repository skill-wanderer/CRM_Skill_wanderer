<script setup lang="ts">
import { computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';

const store = useLeadsStore();

const revenueData = computed(() => {
  const tagRevenue: Record<string, number> = {};
  store.leads.forEach(lead => {
    if (lead.status === 'won') {
      lead.tags.forEach(tag => {
        tagRevenue[tag] = (tagRevenue[tag] || 0) + (lead.value || 0);
      });
    }
  });
  return Object.entries(tagRevenue)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag, revenue]) => ({ tag, revenue }));
});

const maxRevenue = computed(() => Math.max(...revenueData.value.map(d => d.revenue), 1));

const formatCurrency = (val: number) => {
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
  return `$${val}`;
};
</script>

<template>
  <div>
    <h3 class="text-sm font-semibold text-slate-700 mb-4">Revenue by Tag</h3>
    <div v-if="revenueData.length === 0" class="text-sm text-slate-400 italic text-center py-8">
      No won deals yet. Revenue will appear once deals are closed.
    </div>
    <div v-else class="space-y-2.5">
      <div v-for="item in revenueData" :key="item.tag" class="flex items-center gap-3">
        <div class="w-28 text-xs text-slate-600 font-medium truncate flex-shrink-0">{{ item.tag }}</div>
        <div class="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            class="h-2 rounded-full bg-amber-500 transition-all duration-500"
            :style="{ width: `${(item.revenue / maxRevenue) * 100}%` }"
          />
        </div>
        <div class="w-14 text-xs text-slate-500 text-right flex-shrink-0">{{ formatCurrency(item.revenue) }}</div>
      </div>
    </div>
  </div>
</template>
