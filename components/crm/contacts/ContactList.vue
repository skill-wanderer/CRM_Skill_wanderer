<script setup lang="ts">
import { ref, computed } from 'vue';
import { useContactsStore } from '~/stores/contacts';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';

const contactsStore = useContactsStore();
const searchQuery = ref('');

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contactsStore.sortedContacts;
  const q = searchQuery.value.toLowerCase();
  return contactsStore.sortedContacts.filter(c => {
    const company = contactsStore.getContactField(c, 'company').toLowerCase();
    return c.firstName.toLowerCase().includes(q) || 
           c.lastName.toLowerCase().includes(q) ||
           company.includes(q);
  });
});

const selectContact = (id: string) => {
  contactsStore.selectContact(id);
};
</script>

<template>
  <div class="h-full flex flex-col bg-white border-r border-slate-200 w-80 flex-shrink-0">
    <!-- Header & Search -->
    <div class="p-4 border-b border-slate-200">
      <h2 class="text-lg font-semibold text-slate-900 mb-4">Contacts</h2>
      <div class="relative">
        <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon class="h-4 w-4 text-slate-400" aria-hidden="true" />
        </div>
        <input 
          v-model="searchQuery"
          type="text" 
          class="block w-full rounded-md border-0 py-1.5 pl-9 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
          placeholder="Search contacts..." 
        />
      </div>
    </div>

    <!-- Contact List -->
    <div class="flex-1 overflow-y-auto">
      <div v-if="contactsStore.isLoading" class="p-4 text-center text-slate-500 text-sm">
        Loading contacts...
      </div>
      <div v-else-if="filteredContacts.length === 0" class="p-4 text-center text-slate-500 text-sm">
        No contacts found.
      </div>
      <ul v-else class="divide-y divide-slate-100">
        <li 
          v-for="contact in filteredContacts" 
          :key="contact.id"
          @click="selectContact(contact.id)"
          class="group relative flex items-center gap-x-4 px-4 py-4 hover:bg-slate-50 cursor-pointer transition-colors duration-150 ease-in-out"
          :class="{ 'bg-indigo-50 hover:bg-indigo-50 border-l-4 border-indigo-600 pl-3': contactsStore.selectedContactId === contact.id }"
        >
          <div class="h-10 w-10 flex-none rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
            <img v-if="contact.avatarUrl" :src="contact.avatarUrl" :alt="contact.firstName" class="h-full w-full object-cover" />
            <span v-else class="text-slate-500 font-medium text-sm">{{ contact.firstName.charAt(0) }}{{ contact.lastName.charAt(0) }}</span>
          </div>
          <div class="min-w-0 flex-auto">
            <p class="text-sm font-semibold text-slate-900 truncate"
               :class="{ 'text-indigo-900': contactsStore.selectedContactId === contact.id }">
              {{ contact.firstName }} {{ contact.lastName }}
            </p>
            <p class="mt-1 flex text-xs text-slate-500 truncate">
              {{ contactsStore.getContactField(contact, 'company') }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
