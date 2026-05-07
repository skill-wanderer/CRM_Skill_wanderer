<script setup lang="ts">
import { computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import type { TagAnalytics } from '~/types/lead';
import { useTagAnalytics } from '~/composables/useTagAnalytics';

const props = defineProps<{
  analytics: ReturnType<typeof useTagAnalytics>
}>();

const store = useLeadsStore();

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

const sortedByRevenue = props.analytics.getTagRevenue;
const totalRevenue = props.analytics.totalRevenue;

const maxRevenue = computed(() => {
  if (sortedByRevenue.value.length === 0) return 1;
  return Math.max(...sortedByRevenue.value.map(t => t.revenue));
});

const getPercentage = (rev: number) => {
  if (totalRevenue.value === 0) return 0;
  return (rev / totalRevenue.value) * 100;
};

const getBarPercentage = (rev: number) => {
  if (maxRevenue.value === 0) return 0;
  return (rev / maxRevenue.value) * 100;
};

const toggleFilter = (tagName: string) => {
  if (store.filters.tagNames.includes(tagName)) {
    store.filters.tagNames = store.filters.tagNames.filter(t => t !== tagName);
  } else {
    store.filters.tagNames.push(tagName);
  }
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between mb-2">
      <h4 class="text-sm font-semibold text-slate-700">Revenue by Tag</h4>
      <span class="text-xs text-slate-500">Total: {{ formatCurrency(totalRevenue) }}</span>
    </div>

    <div v-if="sortedByRevenue.length === 0" class="text-center text-slate-500 py-8">
      No analytics available yet
    </div>

    <div v-else class="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      <div 
        v-for="tag in sortedByRevenue" 
        :key="tag.tag"
        class="group p-2 -mx-2 rounded hover:bg-slate-50 cursor-pointer transition-colors"
        :class="{ 'bg-teal-50/50': store.filters.tagNames.includes(tag.tag) }"
        @click="toggleFilter(tag.tag)"
      >
        <div class="flex items-center justify-between text-sm mb-1.5">
          <span class="font-medium text-slate-700 group-hover:text-teal-700 transition-colors">{{ tag.tag }}</span>
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold text-teal-600">{{ getPercentage(tag.revenue).toFixed(1) }}%</span>
            <span class="text-slate-500 font-medium">{{ formatCurrency(tag.revenue) }}</span>
          </div>
        </div>
        
        <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-1000 ease-out"
            :style="{ width: `${getBarPercentage(tag.revenue)}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
