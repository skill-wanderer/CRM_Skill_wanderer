<script setup lang="ts">
import { useToast } from '~/composables/useToast';

const { toasts, removeToast } = useToast();

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return '✅';
    case 'error': return '❌';
    default: return 'ℹ️';
  }
};
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
    <transition-group 
      enter-active-class="transition duration-300 ease-out transform"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in transform"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id" 
        class="bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 pointer-events-auto min-w-[300px]"
      >
        <span>{{ getIcon(toast.type) }}</span>
        <span class="text-sm font-medium flex-1">{{ toast.message }}</span>
        <button @click="removeToast(toast.id)" class="text-slate-400 hover:text-white focus:outline-none">
          ✕
        </button>
      </div>
    </transition-group>
  </div>
</template>
