<script setup lang="ts">
import { computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import { useTagAnalytics } from '~/composables/useTagAnalytics';

const props = defineProps<{
  analytics: ReturnType<typeof useTagAnalytics>
}>();

const store = useLeadsStore();

const sortedByGrowth = props.analytics.getTagGrowth;

const fastestGrowing = props.analytics.fastestGrowingTags;

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
      <h4 class="text-sm font-semibold text-slate-700">Growth by Tag</h4>
      <span class="text-xs text-slate-500">Last 30 Days</span>
    </div>

    <div v-if="sortedByGrowth.length === 0" class="text-center text-slate-500 py-8">
      No analytics available yet
    </div>

    <div v-else class="space-y-4 max-h-[400px] overflow-y-auto pr-2">
      <div 
        v-for="tag in sortedByGrowth" 
        :key="tag.tag"
        class="group p-3 rounded-lg border transition-all cursor-pointer"
        :class="store.filters.tagNames.includes(tag.tag) ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-sm'"
        @click="toggleFilter(tag.tag)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 border"
              :class="tag.growth > 0 ? 'text-emerald-500 border-emerald-100' : (tag.growth < 0 ? 'text-red-500 border-red-100' : 'text-slate-400 border-slate-200')"
            >
              <svg v-if="tag.growth > 0" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <svg v-else-if="tag.growth < 0" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" />
              </svg>
            </div>
            <div>
              <div class="font-medium text-slate-800 text-sm">{{ tag.tag }}</div>
              <div class="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">MOM Growth</div>
            </div>
          </div>
          
          <div class="text-right">
            <div class="font-bold text-base" :class="tag.growth > 0 ? 'text-emerald-600' : (tag.growth < 0 ? 'text-red-600' : 'text-slate-600')">
              {{ tag.growth > 0 ? '+' : '' }}{{ tag.growth.toFixed(1) }}%
            </div>
            <div class="text-xs text-slate-400">vs Prev Month</div>
          </div>
        </div>
      </div>
      
      <!-- AI Insight Banner -->
      <div v-if="fastestGrowing.length > 0 && fastestGrowing[0].growth > 0" class="mt-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-100/50 flex items-start gap-3">
        <div class="mt-0.5">
          <svg class="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div>
          <h5 class="text-xs font-bold text-indigo-900">AI Insight</h5>
          <p class="text-xs text-indigo-700 mt-0.5 leading-snug">
            The <strong class="font-bold">{{ fastestGrowing[0].tag }}</strong> tag is your fastest growing segment. Consider allocating more resources here.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
