<script setup lang="ts">
import { useLeadsStore } from '~/stores/leads';
import type { InsightTab } from '~/stores/leads';

const store = useLeadsStore();

const tabs: { key: InsightTab; icon: string }[] = [
  { key: 'Usage', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { key: 'Conversion', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
  { key: 'Engagement', icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' },
  { key: 'Revenue', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { key: 'Growth', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
];
</script>

<template>
  <nav class="flex items-center gap-1 px-4 pt-3 pb-0 overflow-x-auto scrollbar-hide">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      @click="store.setInsightTab(tab.key)"
      class="relative flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg transition-all duration-200 whitespace-nowrap"
      :class="store.activeInsightTab === tab.key
        ? 'bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100'
        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'"
    >
      <svg class="h-3.5 w-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" :d="tab.icon" />
      </svg>
      {{ tab.key }}
      <!-- Active indicator dot -->
      <span
        v-if="store.activeInsightTab === tab.key"
        class="absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-0.5 w-6 bg-indigo-500 rounded-full"
      />
    </button>
  </nav>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
