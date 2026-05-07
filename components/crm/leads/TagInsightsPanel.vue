<script setup lang="ts">
import { useLeadsStore } from '~/stores/leads';
import UsageInsights from './UsageInsights.vue';
import ConversionInsights from './ConversionInsights.vue';
import EngagementInsights from './EngagementInsights.vue';
import RevenueInsights from './RevenueInsights.vue';
import GrowthInsights from './GrowthInsights.vue';

const store = useLeadsStore();

const panelMap: Record<string, any> = {
  Usage: UsageInsights,
  Conversion: ConversionInsights,
  Engagement: EngagementInsights,
  Revenue: RevenueInsights,
  Growth: GrowthInsights,
};
</script>

<template>
  <div class="px-5 py-4 min-h-[260px]">
    <Transition name="insight-fade" mode="out-in">
      <component
        :is="panelMap[store.activeInsightTab]"
        :key="store.activeInsightTab"
      />
    </Transition>
  </div>
</template>

<style scoped>
.insight-fade-enter-active,
.insight-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.insight-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
.insight-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.insight-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.insight-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
