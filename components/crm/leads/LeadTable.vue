<script setup lang="ts">
import { ref, computed } from 'vue';
import UiTable from '~/components/ui/Table.vue';
import UiBadge from '~/components/ui/Badge.vue';
import UiModal from '~/components/ui/Modal.vue';
import TagBadge from './TagBadge.vue';
import { useLeadsStore } from '~/stores/leads';
import { useToast } from '~/composables/useToast';
import type { Lead } from '~/types/lead';

const store = useLeadsStore();
const { addToast } = useToast();

const isDeleteModalOpen = ref(false);
const leadToDelete = ref<Lead | null>(null);
const isDeleting = ref(false);

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

const confirmDelete = (lead: Lead) => {
  leadToDelete.value = lead;
  isDeleteModalOpen.value = true;
};

const handleDelete = async () => {
  if (!leadToDelete.value) return;
  if (isDeleting.value) return;
  
  isDeleting.value = true;
  try {
    await store.deleteLead(leadToDelete.value.id);
    addToast('Lead deleted successfully', 'success');
    isDeleteModalOpen.value = false;
    leadToDelete.value = null;
  } catch (error) {
    addToast('Failed to delete lead', 'error');
  } finally {
    isDeleting.value = false;
  }
};

const filteredLeads = computed(() => {
  return store.leads.filter(lead => {
    if (store.filters.search) {
      const q = store.filters.search.toLowerCase();
      if (!lead.name.toLowerCase().includes(q) && 
          !lead.company.toLowerCase().includes(q) && 
          !lead.email.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (store.filters.status.length > 0 && !store.filters.status.includes(lead.status)) {
      return false;
    }
    if (store.filters.priority && store.filters.priority !== lead.priority) {
      return false;
    }
    if (store.filters.tagNames.length > 0 && !store.filters.tagNames.every(tn => lead.tags.includes(tn))) {
      return false;
    }
    return true;
  });
});

const toggleSelectAll = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked;
  if (checked) {
    store.selectedLeads = filteredLeads.value.map(l => l.id);
  } else {
    store.selectedLeads = [];
  }
};

const isAllSelected = computed(() => {
  return filteredLeads.value.length > 0 && store.selectedLeads.length === filteredLeads.value.length;
});

const openDrawer = (id: string) => {
  store.selectedLeadId = id;
  store.isDrawerOpen = true;
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
    <div v-if="store.isLoading" class="text-center py-10 text-slate-500">Loading leads...</div>
    <div v-else-if="filteredLeads.length === 0" class="text-center py-16 px-4">
      <div class="text-4xl mb-4">📭</div>
      <h3 class="text-lg font-medium text-slate-900 mb-1">No leads found</h3>
      <p class="text-slate-500">Try adjusting your filters or search query.</p>
    </div>
    <UiTable v-else>
      <template #header>
        <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
          <input type="checkbox" :checked="isAllSelected" @change="toggleSelectAll" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600">
        </th>
        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-0">Lead Name</th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Company</th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Tags</th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Priority</th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Value</th>
        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-slate-900">Status</th>
        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
          <span class="sr-only">Actions</span>
        </th>
      </template>
      <template #body>
        <tr v-for="lead in filteredLeads" :key="lead.id" class="hover:bg-slate-50 cursor-pointer transition-colors" @click="openDrawer(lead.id)" :class="{ 'bg-indigo-50/50': store.selectedLeads.includes(lead.id) }">
          <td class="relative w-12 px-6 sm:w-16 sm:px-8" @click.stop>
            <div v-if="store.selectedLeads.includes(lead.id)" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600"></div>
            <input type="checkbox" v-model="store.selectedLeads" :value="lead.id" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600">
          </td>
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
            <div class="font-medium text-slate-900">{{ lead.name }}</div>
            <div class="text-slate-500">{{ lead.email }}</div>
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500">{{ lead.company }}</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
            <div class="flex flex-wrap gap-1 max-w-[200px]">
              <TagBadge 
                v-for="tagName in lead.tags.slice(0, 2)" 
                :key="tagName" 
                :tag="store.globalTags.find(t => t.name === tagName) || { name: tagName, color: 'slate', category: 'Custom', usageCount: 0 }" 
                size="sm"
              />
              <span v-if="lead.tags.length > 2" class="text-xs text-slate-400 font-bold self-center ml-1">+{{ lead.tags.length - 2 }}</span>
            </div>
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm">
            <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                  :class="{
                    'bg-red-50 text-red-700 ring-red-600/10': lead.priority === 'high',
                    'bg-yellow-50 text-yellow-800 ring-yellow-600/20': lead.priority === 'medium',
                    'bg-slate-50 text-slate-600 ring-slate-500/10': lead.priority === 'low'
                  }">
              {{ lead.priority }}
            </span>
          </td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500 font-medium">{{ formatCurrency(lead.value) }}</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-500">
            <UiBadge :status="lead.status" />
          </td>
          <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
            <div class="flex items-center justify-end gap-3">
              <button @click.stop="openDrawer(lead.id)" class="text-indigo-600 hover:text-indigo-900 transition-colors">View</button>
              <button @click.stop="confirmDelete(lead)" class="text-red-600 hover:text-red-900 transition-colors">Delete</button>
            </div>
          </td>
        </tr>
      </template>
    </UiTable>

    <!-- Delete Confirmation Modal -->
    <UiModal 
      :is-open="isDeleteModalOpen" 
      title="Delete Lead"
      @close="isDeleteModalOpen = false"
    >
      <p class="text-slate-600">
        Are you sure you want to delete <span class="font-semibold text-slate-900">{{ leadToDelete?.name }}</span>? This action cannot be undone.
      </p>
      <template #footer>
        <button 
          @click="isDeleteModalOpen = false" 
          class="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          :disabled="isDeleting"
        >
          Cancel
        </button>
        <button 
          @click="handleDelete" 
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center min-w-[80px]"
          :disabled="isDeleting"
        >
          <svg v-if="isDeleting" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span v-else>Delete</span>
        </button>
      </template>
    </UiModal>
  </div>
</template>
