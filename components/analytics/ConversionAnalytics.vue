<script setup lang="ts">
import { useLeadsStore } from '~/stores/leads';
import { useTagAnalytics } from '~/composables/useTagAnalytics';

const props = defineProps<{
  analytics: ReturnType<typeof useTagAnalytics>
}>();

const store = useLeadsStore();

const sortedByConversion = props.analytics.getTagConversionRate;

const getColorClass = (rate: number) => {
  if (rate >= 60) return 'bg-emerald-500';
  if (rate >= 30) return 'bg-amber-400';
  return 'bg-red-500';
};

const getBgClass = (rate: number) => {
  if (rate >= 60) return 'bg-emerald-50';
  if (rate >= 30) return 'bg-amber-50';
  return 'bg-red-50';
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
      <h4 class="text-sm font-semibold text-slate-700">Conversion Rate by Tag</h4>
      <span class="text-xs text-slate-500">Won / Total Tagged</span>
    </div>

    <div v-if="sortedByConversion.length === 0" class="text-center text-slate-500 py-8">
      No analytics available yet
    </div>

    <div v-else class="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      <div 
        v-for="tag in sortedByConversion" 
        :key="tag.tag"
        class="group p-2 -mx-2 rounded hover:bg-slate-50 cursor-pointer transition-colors"
        :class="store.filters.tagNames.includes(tag.tag) ? getBgClass(tag.conversionRate) : ''"
        @click="toggleFilter(tag.tag)"
      >
        <div class="flex items-center justify-between text-sm mb-1.5">
          <span class="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{{ tag.tag }}</span>
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-400">{{ Math.round(tag.conversionRate * tag.usage / 100) }} / {{ tag.usage }} leads</span>
            <span class="font-bold w-12 text-right" :class="{
              'text-emerald-600': tag.conversionRate >= 60,
              'text-amber-600': tag.conversionRate >= 30 && tag.conversionRate < 60,
              'text-red-600': tag.conversionRate < 30
            }">{{ tag.conversionRate.toFixed(1) }}%</span>
          </div>
        </div>
        
        <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            class="h-full rounded-full transition-all duration-1000 ease-out"
            :class="getColorClass(tag.conversionRate)"
            :style="{ width: `${tag.conversionRate}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
