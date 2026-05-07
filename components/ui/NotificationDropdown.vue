<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useAlertsStore } from '~/stores/alerts';
import { 
  BellIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline';

const alertsStore = useAlertsStore();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
  alertsStore.fetchAlerts();
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});

const getIconForType = (type: string) => {
  switch (type) {
    case 'urgent': return ExclamationCircleIcon;
    case 'attention': return ExclamationTriangleIcon;
    case 'healthy': return CheckCircleIcon;
    default: return BellIcon;
  }
};

const getColorClassForType = (type: string) => {
  switch (type) {
    case 'urgent': return 'text-red-500 bg-red-50';
    case 'attention': return 'text-amber-500 bg-amber-50';
    case 'healthy': return 'text-green-500 bg-green-50';
    default: return 'text-slate-500 bg-slate-50';
  }
};

const handleAlertClick = (id: string) => {
  alertsStore.markAsRead(id);
};
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <!-- Bell Button -->
    <button 
      @click="toggleDropdown"
      class="relative p-2 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-full transition-colors"
      aria-label="Notifications"
    >
      <BellIcon class="h-6 w-6" />
      <span 
        v-if="alertsStore.unreadCount > 0"
        class="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white"
      >
        {{ alertsStore.unreadCount }}
      </span>
    </button>

    <!-- Dropdown Panel -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div 
        v-if="isOpen"
        class="absolute right-0 z-50 mt-2 w-80 sm:w-96 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <h3 class="text-sm font-semibold text-slate-900">Notifications</h3>
          <button 
            v-if="alertsStore.unreadCount > 0"
            @click="alertsStore.markAllAsRead"
            class="text-xs font-medium text-indigo-600 hover:text-indigo-500"
          >
            Mark all as read
          </button>
        </div>

        <div class="max-h-96 overflow-y-auto">
          <div v-if="alertsStore.alerts.length === 0" class="px-4 py-6 text-center text-sm text-slate-500">
            No notifications
          </div>
          
          <div 
            v-for="alert in alertsStore.alerts" 
            :key="alert.id"
            @click="handleAlertClick(alert.id)"
            class="group relative flex gap-x-4 px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
            :class="{ 'opacity-60': alert.read }"
          >
            <!-- Unread indicator dot -->
            <div 
              v-if="!alert.read" 
              class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-full"
            ></div>

            <div class="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full" :class="getColorClassForType(alert.type)">
              <component :is="getIconForType(alert.type)" class="h-6 w-6" aria-hidden="true" />
            </div>
            <div class="flex-auto">
              <div class="flex items-start justify-between gap-x-2">
                <p class="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {{ alert.title }}
                </p>
                <p class="text-xs text-slate-500 whitespace-nowrap pt-0.5">
                  {{ new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                </p>
              </div>
              <p class="mt-1 text-sm text-slate-500 line-clamp-2">
                {{ alert.description }}
              </p>
            </div>
          </div>
        </div>
        
        <div class="border-t border-slate-100 px-4 py-2">
          <NuxtLink 
            to="/" 
            @click="isOpen = false"
            class="block text-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View all on Dashboard
          </NuxtLink>
        </div>
      </div>
    </transition>
  </div>
</template>
