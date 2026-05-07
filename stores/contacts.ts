import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Contact } from '~/types/contact';

export const useContactsStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>([]);
  const selectedContactId = ref<string | null>(null);
  const isLoading = ref(false);

  // Getters
  const selectedContact = computed(() => {
    if (!selectedContactId.value) return null;
    return contacts.value.find(c => c.id === selectedContactId.value) || null;
  });

  const sortedContacts = computed(() => {
    return [...contacts.value].sort((a, b) => 
      a.lastName.localeCompare(b.lastName)
    );
  });

  // Helper to extract specific fields
  const getContactField = (contact: Contact, key: string) => {
    return contact.fields.find(f => f.key === key)?.value || '';
  };

  // Actions
  async function fetchContacts() {
    isLoading.value = true;
    try {
      // Mock fetching contacts
      await new Promise(resolve => setTimeout(resolve, 600));
      
      contacts.value = [
        {
          id: '1',
          firstName: 'Alice',
          lastName: 'Smith',
          status: 'Customer',
          lastContacted: new Date(Date.now() - 86400000 * 2).toISOString(),
          owner: 'Jane Doe',
          tags: ['Enterprise', 'Decision Maker', 'Q3 Pipeline'],
          avatarUrl: 'https://i.pravatar.cc/150?u=1',
          fields: [
            { key: 'email', label: 'Email', value: 'alice.smith@techcorp.com', type: 'email' },
            { key: 'phone', label: 'Phone number', value: '+1 (555) 123-4567', type: 'phone' },
            { key: 'linkedin', label: 'LinkedIn URL', value: 'https://linkedin.com/in/alicesmith', type: 'url' },
            { key: 'company', label: 'Company', value: 'TechCorp', type: 'text' },
            { key: 'jobTitle', label: 'Job title', value: 'VP of Engineering', type: 'text' },
            { key: 'notes', label: 'Notes', value: 'Alice is leading the digital transformation initiative at TechCorp. Key decision maker for new software acquisitions.', type: 'textarea' },
          ]
        },
        {
          id: '2',
          firstName: 'Bob',
          lastName: 'Jones',
          status: 'Lead',
          lastContacted: new Date(Date.now() - 86400000 * 5).toISOString(),
          owner: 'John Smith',
          tags: ['IT', 'Evaluation Phase'],
          avatarUrl: 'https://i.pravatar.cc/150?u=2',
          fields: [
            { key: 'email', label: 'Email', value: 'bjones@globalsolutions.inc', type: 'email' },
            { key: 'phone', label: 'Phone number', value: '+1 (555) 987-6543', type: 'phone' },
            { key: 'linkedin', label: 'LinkedIn URL', value: '', type: 'url' },
            { key: 'company', label: 'Company', value: 'Global Solutions', type: 'text' },
            { key: 'jobTitle', label: 'Job title', value: 'Director of IT', type: 'text' },
            { key: 'notes', label: 'Notes', value: 'Bob is currently evaluating options for a new CRM system. Very detail-oriented.', type: 'textarea' },
          ]
        },
        {
          id: '3',
          firstName: 'Charlie',
          lastName: 'Brown',
          status: 'Qualified',
          lastContacted: new Date().toISOString(),
          owner: 'Jane Doe',
          tags: ['Startup', 'High Growth'],
          avatarUrl: 'https://i.pravatar.cc/150?u=3',
          fields: [
            { key: 'email', label: 'Email', value: 'charlie@startup.io', type: 'email' },
            { key: 'phone', label: 'Phone number', value: '+1 (555) 555-0199', type: 'phone' },
            { key: 'linkedin', label: 'LinkedIn URL', value: 'https://linkedin.com/in/charliebrown', type: 'url' },
            { key: 'company', label: 'Company', value: 'StartUp Inc', type: 'text' },
            { key: 'jobTitle', label: 'Job title', value: 'Founder & CEO', type: 'text' },
            { key: 'notes', label: 'Notes', value: 'Charlie runs a fast-growing startup and needs scalable solutions.', type: 'textarea' },
          ]
        },
        {
          id: '4',
          firstName: 'Diana',
          lastName: 'Prince',
          status: 'Prospect',
          lastContacted: new Date(Date.now() - 86400000 * 14).toISOString(),
          owner: 'Bruce Wayne',
          tags: ['Government', 'VIP'],
          avatarUrl: 'https://i.pravatar.cc/150?u=4',
          fields: [
            { key: 'email', label: 'Email', value: 'diana.prince@themyscira.gov', type: 'email' },
            { key: 'phone', label: 'Phone number', value: '+1 (555) 444-3322', type: 'phone' },
            { key: 'linkedin', label: 'LinkedIn URL', value: '', type: 'url' },
            { key: 'company', label: 'Company', value: 'Themyscira Corp', type: 'text' },
            { key: 'jobTitle', label: 'Job title', value: 'Chief Strategy Officer', type: 'text' },
            { key: 'notes', label: 'Notes', value: 'Looking to expand their international operations. Needs top-tier support.', type: 'textarea' },
          ]
        },
        {
          id: '5',
          firstName: 'Evan',
          lastName: 'Wright',
          status: 'Lost',
          lastContacted: new Date(Date.now() - 86400000 * 60).toISOString(),
          owner: 'John Smith',
          tags: ['Consulting', 'Partner'],
          fields: [
            { key: 'email', label: 'Email', value: 'evan@wrightconsulting.com', type: 'email' },
            { key: 'phone', label: 'Phone number', value: '+1 (555) 222-1111', type: 'phone' },
            { key: 'linkedin', label: 'LinkedIn URL', value: '', type: 'url' },
            { key: 'company', label: 'Company', value: 'Wright Consulting', type: 'text' },
            { key: 'jobTitle', label: 'Job title', value: 'Principal Consultant', type: 'text' },
            { key: 'notes', label: 'Notes', value: 'Evan was a partner last year but hasn\'t renewed the contract.', type: 'textarea' },
          ]
        }
      ];

      if (!selectedContactId.value && contacts.value.length > 0) {
        selectedContactId.value = contacts.value[0].id;
      }
    } finally {
      isLoading.value = false;
    }
  }

  function selectContact(id: string) {
    selectedContactId.value = id;
  }

  function updateContactField(contactId: string, fieldKey: string, newValue: string) {
    const contact = contacts.value.find(c => c.id === contactId);
    if (contact) {
      const field = contact.fields.find(f => f.key === fieldKey);
      if (field) {
        field.value = newValue;
      }
    }
  }

  function updateContactStatus(contactId: string, status: Contact['status']) {
    const contact = contacts.value.find(c => c.id === contactId);
    if (contact) {
      contact.status = status;
    }
  }

  return {
    contacts,
    selectedContactId,
    isLoading,
    selectedContact,
    sortedContacts,
    fetchContacts,
    selectContact,
    updateContactField,
    updateContactStatus,
    getContactField
  };
});
