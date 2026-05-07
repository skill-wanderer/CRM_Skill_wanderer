<script setup lang="ts">
import { computed } from 'vue';
import type { Tag } from '~/types/lead';

const props = defineProps<{
  tag: Tag;
  showRemove?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>();

const emit = defineEmits(['remove', 'click']);

const colorClasses = computed(() => {
  const baseColors: Record<string, string> = {
    red: 'bg-red-50 text-red-700 border-red-100 ring-red-500/10 hover:bg-red-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/10 hover:bg-amber-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/10 hover:bg-emerald-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100 ring-blue-500/10 hover:bg-blue-100',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100 ring-indigo-500/10 hover:bg-indigo-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100 ring-purple-500/10 hover:bg-purple-100',
    pink: 'bg-pink-50 text-pink-700 border-pink-100 ring-pink-500/10 hover:bg-pink-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-100 ring-slate-500/10 hover:bg-slate-100',
    orange: 'bg-orange-50 text-orange-700 border-orange-100 ring-orange-500/10 hover:bg-orange-100',
  };

  return baseColors[props.tag.color] || baseColors.slate;
});

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm': return 'px-2 py-0.5 text-xs';
    case 'lg': return 'px-3 py-1.5 text-base';
    default: return 'px-2.5 py-1 text-sm';
  }
});
</script>

<template>
  <div 
    class="group relative inline-flex items-center rounded-full border ring-1 ring-inset transition-all duration-200 cursor-pointer hover:scale-105 hover:shadow-sm"
    :class="[colorClasses, sizeClasses]"
    @click="emit('click')"
  >
    <!-- Tag Content -->
    <span class="font-medium tracking-tight whitespace-nowrap">{{ tag.name }}</span>

    <!-- Remove Button -->
    <button 
      v-if="showRemove" 
      @click.stop="emit('remove')" 
      class="ml-1.5 -mr-1 h-3.5 w-3.5 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
    >
      <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
        <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
      </svg>
    </button>

    <!-- Tooltip (Simple Title for now, could be enhanced) -->
    <div 
      class="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 bg-slate-800 text-white text-xs rounded shadow-lg z-50 pointer-events-none transition-opacity duration-200"
    >
      <div class="font-bold">{{ tag.category }}</div>
      <div v-if="tag.description" class="opacity-80">{{ tag.description }}</div>
      <div class="mt-1 border-t border-white/10 pt-1">Used {{ tag.usageCount }} times</div>
      <!-- Triangle -->
      <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
    </div>
  </div>
</template>
