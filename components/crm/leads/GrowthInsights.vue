<script setup lang="ts">
import { computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';

const store = useLeadsStore();

const growthData = computed(() => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  const recent: Record<string, number> = {};
  const previous: Record<string, number> = {};

  store.leads.forEach(lead => {
    const createdAt = new Date(lead.createdAt);
    lead.tags.forEach(tag => {
      if (createdAt >= thirtyDaysAgo) {
        recent[tag] = (recent[tag] || 0) + 1;
      } else if (createdAt >= sixtyDaysAgo) {
        previous[tag] = (previous[tag] || 0) + 1;
      }
    });
  });

  const allTags = new Set([...Object.keys(recent), ...Object.keys(previous)]);
  return Array.from(allTags)
    .map(tag => {
      const r = recent[tag] || 0;
      const p = previous[tag] || 0;
      const growth = p > 0 ? Math.round(((r - p) / p) * 100) : (r > 0 ? 100 : 0);
      return { tag, growth, recent: r };
    })
    .sort((a, b) => b.growth - a.growth)
    .slice(0, 8);
});
</script>

<template>
  <div>
    <h3 class="text-sm font-semibold text-slate-700 mb-4">Tag Growth (30-day vs previous 30-day)</h3>
    <div v-if="growthData.length === 0" class="text-sm text-slate-400 italic text-center py-8">
      Not enough historical data to calculate growth trends yet.
    </div>
    <div v-else class="space-y-2.5">
      <div v-for="item in growthData" :key="item.tag" class="flex items-center gap-3">
        <div class="w-28 text-xs text-slate-600 font-medium truncate flex-shrink-0">{{ item.tag }}</div>
        <div class="flex-1">
          <span
            class="text-xs font-semibold px-1.5 py-0.5 rounded"
            :class="item.growth >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-red-700 bg-red-50'"
          >
            {{ item.growth >= 0 ? '+' : '' }}{{ item.growth }}%
          </span>
        </div>
        <div class="w-16 text-xs text-slate-400 text-right flex-shrink-0">{{ item.recent }} new</div>
      </div>
    </div>
  </div>
</template>
