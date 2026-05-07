<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import UiButton from '~/components/ui/Button.vue';
import UiBadge from '~/components/ui/Badge.vue';
import LeadContactInfo from './LeadContactInfo.vue';
import LeadSocialLinks from './LeadSocialLinks.vue';
import LeadTags from './LeadTags.vue';
import LeadNotes from './LeadNotes.vue';
import LeadActivityTimeline from './LeadActivityTimeline.vue';
import LeadEditForm from './LeadEditForm.vue';

const store = useLeadsStore();
const isEditing = ref(false);

const lead = computed(() => {
  return store.leads.find(l => l.id === store.selectedLeadId);
});

const closeDrawer = () => {
  store.isDrawerOpen = false;
  setTimeout(() => {
    store.selectedLeadId = null;
    isEditing.value = false;
  }, 300); // Wait for transition
};
</script>

<template>
  <div>
    <!-- Backdrop -->
    <transition
      enter-active-class="transition-opacity ease-linear duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-linear duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="store.isDrawerOpen" class="fixed inset-0 bg-slate-900/50 z-40 transition-opacity" @click="closeDrawer"></div>
    </transition>

    <!-- Drawer Panel -->
    <transition
      enter-active-class="transition ease-in-out duration-300 transform"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition ease-in-out duration-300 transform"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <div v-if="store.isDrawerOpen" class="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white shadow-2xl flex flex-col overflow-hidden transform transition-all">
        
        <!-- Header -->
        <div class="px-6 py-6 border-b border-slate-200 bg-slate-50 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h2 class="text-xl font-semibold text-slate-900">{{ lead?.name }}</h2>
            <p class="text-sm text-slate-500 mt-1">{{ lead?.company }} • <UiBadge :status="lead?.status || 'new'" /></p>
          </div>
          <button @click="closeDrawer" class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 transition-colors flex items-center justify-center">
            <span class="text-xl leading-none">✕</span>
          </button>
        </div>

        <!-- Content -->
        <div class="flex-1 overflow-y-auto p-6" v-if="lead">
          <div class="space-y-10">
            <template v-if="!isEditing">
              <LeadContactInfo :lead="lead" />
              <LeadSocialLinks :lead="lead" />
              <LeadTags :lead="lead" />
              <LeadNotes :lead="lead" />
              <LeadActivityTimeline :lead="lead" />
            </template>
            
            <template v-else>
              <h3 class="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Edit Lead Details</h3>
              <LeadEditForm :lead="lead" @close="isEditing = false" />
            </template>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3 sticky bottom-0 z-10" v-if="!isEditing">
          <UiButton variant="secondary" @click="closeDrawer">Close</UiButton>
          <UiButton variant="primary" @click="isEditing = true">Edit Lead</UiButton>
        </div>
      </div>
    </transition>
  </div>
</template>
