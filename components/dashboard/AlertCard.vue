<script setup lang="ts">
import { computed } from 'vue';
import type { Alert } from '~/types/alert';
import { 
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';

const props = defineProps<{
  alert: Alert;
}>();

const emit = defineEmits<{
  (e: 'action', id: string): void;
}>();

const colorConfig = computed(() => {
  switch (props.alert.type) {
    case 'urgent':
      return {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-500',
        title: 'text-red-800',
        desc: 'text-red-700',
        button: 'bg-red-100 text-red-700 hover:bg-red-200',
      };
    case 'attention':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: 'text-amber-500',
        title: 'text-amber-800',
        desc: 'text-amber-700',
        button: 'bg-amber-100 text-amber-700 hover:bg-amber-200',
      };
    case 'healthy':
    default:
      return {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-500',
        title: 'text-green-800',
        desc: 'text-green-700',
        button: 'bg-green-100 text-green-700 hover:bg-green-200',
      };
  }
});

const getIcon = (type: string) => {
  switch (type) {
    case 'urgent': return ExclamationCircleIcon;
    case 'attention': return ExclamationTriangleIcon;
    case 'healthy': return CheckCircleIcon;
    default: return CheckCircleIcon;
  }
};
</script>

<template>
  <div 
    class="rounded-lg border p-4 shadow-sm transition-all hover:shadow-md"
    :class="[colorConfig.bg, colorConfig.border]"
  >
    <div class="flex gap-x-3">
      <div class="flex-shrink-0 mt-0.5">
        <component :is="getIcon(alert.type)" class="h-5 w-5" :class="colorConfig.icon" aria-hidden="true" />
      </div>
      <div class="flex-1">
        <h3 class="text-sm font-medium" :class="colorConfig.title">
          {{ alert.title }}
        </h3>
        <p class="mt-1 text-sm leading-relaxed" :class="colorConfig.desc">
          {{ alert.description }}
        </p>
        <div class="mt-3 flex items-center justify-between">
          <span class="text-xs font-medium opacity-80" :class="colorConfig.desc">
            {{ new Date(alert.createdAt).toLocaleDateString() }}
          </span>
          <button 
            @click="emit('action', alert.id)"
            class="rounded px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1"
            :class="[colorConfig.button, colorConfig.border ? `focus:ring-${colorConfig.border.split('-')[1]}-500` : '']"
          >
            Take Action
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
