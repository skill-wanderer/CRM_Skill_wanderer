<script setup lang="ts">
import { computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import { useTagAnalytics } from '~/composables/useTagAnalytics';

const props = defineProps<{
  analytics: ReturnType<typeof useTagAnalytics>
}>();

const store = useLeadsStore();

const sortedByEngagement = props.analytics.getTagEngagement;

const maxEngagement = computed(() => {
  if (sortedByEngagement.value.length === 0) return 1;
  return Math.max(...sortedByEngagement.value.map(t => t.engagement));
});

const getPercentage = (engagement: number) => {
  if (maxEngagement.value === 0) return 0;
  return (engagement / maxEngagement.value) * 100;
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
      <h4 class="text-sm font-semibold text-slate-700">Engagement Score</h4>
      <span class="text-xs text-slate-500">Based on activities & notes</span>
    </div>

    <div v-if="sortedByEngagement.length === 0" class="text-center text-slate-500 py-8">
      No analytics available yet
    </div>

    <div v-else class="space-y-3 max-h-[400px] overflow-y-auto pr-2">
      <div 
        v-for="tag in sortedByEngagement" 
        :key="tag.tag"
        class="group p-2 -mx-2 rounded hover:bg-slate-50 cursor-pointer transition-colors"
        :class="{ 'bg-violet-50/50': store.filters.tagNames.includes(tag.tag) }"
        @click="toggleFilter(tag.tag)"
      >
        <div class="flex items-center justify-between text-sm mb-1.5">
          <span class="font-medium text-slate-700 group-hover:text-violet-700 transition-colors">{{ tag.tag }}</span>
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-400">Score</span>
            <span class="font-bold text-violet-600">{{ tag.engagement }}</span>
          </div>
        </div>
        
        <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            class="h-full bg-gradient-to-r from-violet-400 to-fuchsia-500 rounded-full transition-all duration-1000 ease-out"
            :style="{ width: `${getPercentage(tag.engagement)}%` }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>
