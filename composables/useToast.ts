import { ref } from 'vue';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

const toasts = ref<ToastMessage[]>([]);

export function useToast() {
  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = String(Date.now());
    toasts.value.push({ id, message, type });
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id: string) => {
    toasts.value = toasts.value.filter(t => t.id !== id);
  };

  return {
    toasts,
    addToast,
    removeToast,
  };
}
