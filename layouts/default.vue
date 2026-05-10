<script setup lang="ts">
import NotificationDropdown from '~/components/ui/NotificationDropdown.vue';
import ToastContainer from '~/components/ui/ToastContainer.vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  navigateTo('/login');
};
// Default layout with Sidebar and Navbar
</script>

<template>
  <div class="flex h-screen bg-slate-50">
    <!-- Placeholder for Sidebar -->
    <aside class="w-64 bg-slate-900 text-white flex flex-col">
      <div class="h-16 flex items-center px-6 font-bold text-xl border-b border-slate-800">
        SW CRM
      </div>
      <nav class="flex-1 py-4 flex flex-col gap-2 px-4">
        <NuxtLink to="/leads" class="px-4 py-2 rounded hover:bg-slate-800">Leads</NuxtLink>
      </nav>
      <div class="p-4 border-t border-slate-800">
        <button @click="handleLogout" class="w-full text-left px-4 py-2 rounded text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Placeholder for Navbar -->
      <header class="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between">
        <div class="font-semibold text-slate-700">Guild Dashboard</div>
        <div class="flex items-center gap-4">
          <NotificationDropdown />
          <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
            {{ authStore.userInitials }}
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1 overflow-auto p-6">
        <slot />
      </main>
    </div>
    <ToastContainer />
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-slate-800;
}
</style>
