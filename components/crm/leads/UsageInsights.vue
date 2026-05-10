<script setup lang="ts">
import { computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';

const store = useLeadsStore();

const usageData = computed(() => {
  const counts: Record<string, number> = {};
  store.leads.forEach(lead => {
    lead.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([tag, count]) => ({ tag, count }));
});

const maxCount = computed(() => Math.max(...usageData.value.map(d => d.count), 1));
</script>

<template>
  <div>
    <h3 class="text-sm font-semibold text-slate-700 mb-4">Tag Usage Frequency</h3>
    <div v-if="usageData.length === 0" class="text-sm text-slate-400 italic text-center py-8">
      No tag data available yet.
    </div>
    <div v-else class="space-y-2.5">
      <div v-for="item in usageData" :key="item.tag" class="flex items-center gap-3">
        <div class="w-28 text-xs text-slate-600 font-medium truncate flex-shrink-0">{{ item.tag }}</div>
        <div class="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
          <div
            class="h-2 rounded-full bg-indigo-500 transition-all duration-500"
            :style="{ width: `${(item.count / maxCount) * 100}%` }"
          />
        </div>
        <div class="w-8 text-xs text-slate-500 text-right flex-shrink-0">{{ item.count }}</div>
      </div>
    </div>
  </div>
</template>
