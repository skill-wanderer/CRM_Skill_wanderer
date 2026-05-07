<script setup lang="ts">
import { onMounted } from 'vue';
import { useContactsStore } from '~/stores/contacts';
import ContactList from '~/components/crm/contacts/ContactList.vue';
import ContactProfile from '~/components/crm/contacts/ContactProfile.vue';
import ContactDetailsPanel from '~/components/crm/contacts/ContactDetailsPanel.vue';

// Page Title
useHead({ title: 'Contacts - CRM Enterprise' });

const contactsStore = useContactsStore();

onMounted(() => {
  contactsStore.fetchContacts();
});
</script>

<template>
  <!-- Main container taking full height of the parent -->
  <div class="h-full flex flex-col -m-6"> <!-- Negative margin to negate parent padding if needed, or adjust parent. Assuming parent has p-6 -->
    <div class="flex-1 flex overflow-hidden bg-white shadow-sm ring-1 ring-slate-200 sm:rounded-lg m-6">
      
      <!-- Left Pane: Contact List -->
      <ContactList />

      <!-- Center Pane: Profile -->
      <ContactProfile />

      <!-- Right Pane: Details Panel -->
      <ContactDetailsPanel class="hidden lg:flex" />
      
    </div>
  </div>
</template>
