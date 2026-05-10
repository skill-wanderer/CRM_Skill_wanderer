<script setup lang="ts">
import { computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';

const store = useLeadsStore();

const conversionData = computed(() => {
  const tagStats: Record<string, { total: number; won: number }> = {};
  store.leads.forEach(lead => {
    lead.tags.forEach(tag => {
      if (!tagStats[tag]) tagStats[tag] = { total: 0, won: 0 };
      tagStats[tag].total++;
      if (lead.status === 'won') tagStats[tag].won++;
    });
  });
  return Object.entries(tagStats)
    .map(([tag, s]) => ({ tag, rate: s.total > 0 ? Math.round((s.won / s.total) * 100) : 0 }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 8);
});
</script>

<template>
  <div>
    <h3 class="text-sm font-semibold text-slate-700 mb-4">Tag Conversion Rates</h3>
    <div v-if="conversionData.length === 0" class="text-sm text-slate-400 italic text-center py-8">
      No conversion data available yet.
    </div>
    <div v-else class="space-y-2.5">
      <div v-for="item in conversionData" :key="item.tag" class="flex items-center gap-3">
        <div class="w-28 text-xs text-slate-600 font-medium truncate flex-shrink-0">{{ item.tag }}</div>
        <div class="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            class="h-2 rounded-full bg-emerald-500 transition-all duration-500"
            :style="{ width: `${item.rate}%` }"
          />
        </div>
        <div class="w-10 text-xs text-slate-500 text-right flex-shrink-0">{{ item.rate }}%</div>
      </div>
    </div>
  </div>
</template>
