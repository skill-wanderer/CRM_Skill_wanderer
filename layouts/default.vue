<script setup lang="ts">
import NotificationDropdown from '~/components/ui/NotificationDropdown.vue';
import ToastContainer from '~/components/ui/ToastContainer.vue';
// Default layout with Sidebar and Navbar
</script>

<template>
  <div class="flex h-screen bg-slate-50">
    <!-- Placeholder for Sidebar -->
    <aside class="w-64 bg-slate-900 text-white flex flex-col">
      <div class="h-16 flex items-center px-6 font-bold text-xl border-b border-slate-800">
        CRM Enterprise
      </div>
      <nav class="flex-1 py-4 flex flex-col gap-2 px-4">
        <NuxtLink to="/leads" class="px-4 py-2 rounded hover:bg-slate-800">Leads</NuxtLink>
      </nav>
    </aside>

    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <!-- Placeholder for Navbar -->
      <header class="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between">
        <div class="font-semibold text-slate-700">Command Center</div>
        <div class="flex items-center gap-4">
          <NotificationDropdown />
          <div class="w-8 h-8 rounded-full bg-slate-200"></div>
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
