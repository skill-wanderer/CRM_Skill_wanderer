<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  title: string;
}>();

const emit = defineEmits(['close']);

const close = () => emit('close');

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.isOpen) {
    close();
  }
};

onMounted(() => {
  document.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" @click="close"></div>
          
          <!-- Modal panel -->
          <div class="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 overflow-hidden transform transition-all">
            <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-slate-900">{{ title }}</h3>
              <button @click="close" class="text-slate-400 hover:text-slate-500 transition-colors">
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <div class="px-6 py-4">
              <slot />
            </div>
            <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-xl">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}
</style>
