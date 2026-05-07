<script setup lang="ts">
import { computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import type { TagAnalytics } from '~/types/lead';
import { useTagAnalytics } from '~/composables/useTagAnalytics';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  analytics: ReturnType<typeof useTagAnalytics>
}>();

const store = useLeadsStore();

const sortedByUsage = props.analytics.getTagUsage;

const chartData = computed(() => {
  const activeTags = sortedByUsage.value.filter(t => t.usage > 0);
  return {
    labels: activeTags.map(t => t.tag),
    datasets: [
      {
        backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316', '#64748b'],
        data: activeTags.map(t => t.usage),
      }
    ]
  }
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
};

const maxUsage = computed(() => {
  if (sortedByUsage.value.length === 0) return 1;
  return Math.max(...sortedByUsage.value.map(t => t.usage));
});

const getPercentage = (usage: number) => {
  if (maxUsage.value === 0) return 0;
  return (usage / maxUsage.value) * 100;
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
      <h4 class="text-sm font-semibold text-slate-700">Most Used Tags</h4>
      <span class="text-xs text-slate-500">{{ sortedByUsage.filter(t => t.usage > 0).length }} active tags</span>
    </div>

    <div v-if="sortedByUsage.length === 0 || sortedByUsage.filter(t => t.usage > 0).length === 0" class="text-center text-slate-500 py-8">
      No analytics available yet
    </div>

    <div v-else class="space-y-3">
      <!-- Donut Chart -->
      <div class="h-40 w-full mb-4">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>

      <div class="max-h-[250px] overflow-y-auto pr-2 space-y-3">
        <div 
          v-for="tag in sortedByUsage" 
          :key="tag.tag"
          class="group p-2 -mx-2 rounded hover:bg-slate-50 cursor-pointer transition-colors relative"
          :class="{ 'bg-indigo-50/50': store.filters.tagNames.includes(tag.tag) }"
          @click="toggleFilter(tag.tag)"
        >
          <div class="flex items-center justify-between text-sm mb-1.5 relative z-10">
            <span class="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">{{ tag.tag }}</span>
            <span class="text-slate-500 text-xs">{{ tag.usage }} leads</span>
          </div>
          
          <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden relative z-10">
            <div 
              class="h-full rounded-full transition-all duration-1000 ease-out"
              :class="[
                store.filters.tagNames.includes(tag.tag) ? 'bg-indigo-600' : 'bg-indigo-400',
                tag.usage === 0 ? 'bg-slate-300' : ''
              ]"
              :style="{ width: `${getPercentage(tag.usage)}%` }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
