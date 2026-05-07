<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import { useTagAnalytics } from '~/composables/useTagAnalytics';
import TagInsightsNavbar from '~/components/crm/leads/TagInsightsNavbar.vue';
import UsageAnalytics from './UsageAnalytics.vue';
import RevenueAnalytics from './RevenueAnalytics.vue';
import ConversionAnalytics from './ConversionAnalytics.vue';
import GrowthAnalytics from './GrowthAnalytics.vue';
import EngagementAnalytics from './EngagementAnalytics.vue';

const store = useLeadsStore();
const analyticsState = useTagAnalytics();

const isExpanded = ref(true);

const activeComponent = computed(() => {
  switch (store.activeInsightTab) {
    case 'Usage': return UsageAnalytics;
    case 'Revenue': return RevenueAnalytics;
    case 'Conversion': return ConversionAnalytics;
    case 'Growth': return GrowthAnalytics;
    case 'Engagement': return EngagementAnalytics;
    default: return UsageAnalytics;
  }
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
    <!-- Header: Click to expand/collapse -->
    <div 
      class="px-5 py-4 border-b border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
      @click="isExpanded = !isExpanded"
    >
      <div class="flex items-center gap-2">
        <h3 class="font-bold text-slate-900 text-base">Tag Insights</h3>
        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 uppercase tracking-wider">Analytics</span>
      </div>
      <div class="flex items-center gap-3 text-slate-400">
        <!-- Rotating Chevron -->
        <svg 
          class="w-5 h-5 transition-transform duration-300" 
          :class="{ 'rotate-180': isExpanded }"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    <!-- Collapsible Content -->
    <div 
      class="transition-all duration-350 ease-in-out overflow-hidden flex flex-col"
      :class="isExpanded ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'"
    >
      <!-- Navbar -->
      <div class="px-5 pt-3">
        <TagInsightsNavbar />
      </div>

      <!-- Dynamic Content Panel -->
      <div class="p-5 flex-1 relative min-h-[300px]">
        <Transition name="fade-slide" mode="out-in">
          <component :is="activeComponent" :analytics="analyticsState" />
        </Transition>
      </div>

      <!-- Footer -->
      <div class="bg-slate-50 p-4 border-t border-slate-100 mt-auto text-xs text-slate-500 flex justify-between">
        <div>Total Tags: <span class="font-bold text-slate-700">{{ store.globalTags.length }}</span></div>
        <div>Total Tagged Leads: <span class="font-bold text-slate-700">{{ analyticsState.totalLeadsWithTags.value }}</span></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
