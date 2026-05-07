<script setup lang="ts">
import { computed, ref } from 'vue';
import { useContactsStore } from '~/stores/contacts';
import EditableField from '~/components/ui/EditableField.vue';
import type { Contact } from '~/types/contact';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';

const contactsStore = useContactsStore();
const contact = computed(() => contactsStore.selectedContact);

const handleSave = (key: string, newValue: string) => {
  if (contact.value) {
    contactsStore.updateContactField(contact.value.id, key, newValue);
  }
};

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Lead': return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
    case 'Qualified': return 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200';
    case 'Prospect': return 'bg-purple-100 text-purple-700 hover:bg-purple-200';
    case 'Customer': return 'bg-green-100 text-green-700 hover:bg-green-200';
    case 'Lost': return 'bg-red-100 text-red-700 hover:bg-red-200';
    default: return 'bg-slate-100 text-slate-700 hover:bg-slate-200';
  }
}

const statusOptions: Contact['status'][] = ['Lead', 'Qualified', 'Prospect', 'Customer', 'Lost'];
const isStatusDropdownOpen = ref(false);

const selectStatus = (status: Contact['status']) => {
  if (contact.value) {
    contactsStore.updateContactStatus(contact.value.id, status);
  }
  isStatusDropdownOpen.value = false;
};

// Close dropdown if clicked outside (simple implementation using a transparent overlay)
const closeDropdown = () => {
  isStatusDropdownOpen.value = false;
};
</script>

<template>
  <div class="w-80 border-l border-slate-200 bg-white h-full flex flex-col flex-shrink-0 relative">
    
    <!-- Transparent overlay to catch outside clicks for the dropdown -->
    <div v-if="isStatusDropdownOpen" @click="closeDropdown" class="fixed inset-0 z-10"></div>

    <div v-if="!contact" class="p-6 text-center text-sm text-slate-500">
      Details will appear here.
    </div>
    
    <div v-else class="flex-1 overflow-y-auto">
      <div class="p-6 border-b border-slate-200">
        <h3 class="text-sm font-semibold text-slate-900 mb-4">About this contact</h3>
        
        <dl class="space-y-6 text-sm">
          <!-- Status Dropdown (Root level property) -->
          <div>
            <dt class="text-slate-500 font-medium mb-1">Lifecycle Stage</dt>
            <dd class="relative">
              <button 
                @click="isStatusDropdownOpen = !isStatusDropdownOpen"
                class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset ring-white/10 transition-colors focus:outline-none z-20 relative"
                :class="getStatusColor(contact.status)"
              >
                {{ contact.status }}
                <ChevronDownIcon class="ml-1 h-3 w-3 flex-shrink-0" aria-hidden="true" />
              </button>
              
              <!-- Dropdown Menu -->
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div v-if="isStatusDropdownOpen" class="absolute left-0 top-full mt-1 w-40 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-30 overflow-hidden">
                  <div class="py-1">
                    <button
                      v-for="option in statusOptions"
                      :key="option"
                      @click="selectStatus(option)"
                      class="block w-full text-left px-4 py-2 text-sm transition-colors"
                      :class="[
                        contact.status === option ? 'bg-slate-50 text-indigo-600 font-medium' : 'text-slate-700 hover:bg-slate-50'
                      ]"
                    >
                      <span class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium" :class="getStatusColor(option)">
                        {{ option }}
                      </span>
                    </button>
                  </div>
                </div>
              </transition>
            </dd>
          </div>
          
          <!-- Contact Owner (Root level property) -->
          <div>
            <dt class="text-slate-500 font-medium mb-1">Contact Owner</dt>
            <dd class="text-slate-900 flex items-center gap-2">
              <div class="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                {{ contact.owner.charAt(0) }}
              </div>
              {{ contact.owner }}
            </dd>
          </div>

          <!-- Last Contacted (Root level property) -->
          <div v-if="contact.lastContacted">
            <dt class="text-slate-500 font-medium mb-1">Last Contacted</dt>
            <dd class="text-slate-900">
              {{ new Date(contact.lastContacted).toLocaleDateString() }}
            </dd>
          </div>

          <!-- Dynamic Fields -->
          <div v-for="field in contact.fields" :key="`${contact.id}-${field.key}`" class="pt-2 border-t border-slate-100 first-of-type:border-t-0 first-of-type:pt-0">
            <dt class="text-slate-500 font-medium mb-2">{{ field.label }}</dt>
            <dd class="text-slate-900">
              <EditableField
                :modelValue="field.value"
                :label="field.label"
                :type="field.type as any"
                :isLinkedIn="field.key === 'linkedin'"
                @save="handleSave(field.key, $event)"
              />
            </dd>
          </div>
        </dl>
      </div>

      <!-- Tags Section -->
      <div class="p-6">
        <h3 class="text-sm font-semibold text-slate-900 mb-3">Tags</h3>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in contact.tags" 
            :key="tag"
            class="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 border border-slate-200"
          >
            {{ tag }}
          </span>
          <button class="inline-flex items-center rounded border border-dashed border-slate-300 px-2 py-0.5 text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors">
            + Add Tag
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
