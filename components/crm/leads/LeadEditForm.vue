<script setup lang="ts">
import { ref } from 'vue';
import type { Lead, LeadStatus, LeadPriority } from '~/types/lead';
import { useLeadActions } from '~/composables/useLeadActions';
import UiButton from '~/components/ui/Button.vue';

const props = defineProps<{
  lead: Lead;
}>();

const emit = defineEmits(['close']);
const { saveLead } = useLeadActions();

const form = ref({
  name: props.lead.name,
  company: props.lead.company,
  email: props.lead.email,
  phone: props.lead.phone || '',
  linkedinUrl: props.lead.linkedinUrl || '',
  value: props.lead.value,
  score: props.lead.score,
  assignedRep: props.lead.assignedRep || '',
  priority: props.lead.priority,
  status: props.lead.status,
});

const isSaving = ref(false);

const submit = async () => {
  isSaving.value = true;
  await saveLead(props.lead.id, { ...form.value });
  isSaving.value = false;
  emit('close');
};
</script>

<template>
  <form @submit.prevent="submit" class="space-y-6">
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-slate-700">Full Name</label>
        <input v-model="form.name" required type="text" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
      </div>
      
      <div class="sm:col-span-1">
        <label class="block text-sm font-medium text-slate-700">Company</label>
        <input v-model="form.company" required type="text" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
      </div>

      <div class="sm:col-span-1">
        <label class="block text-sm font-medium text-slate-700">Email Address</label>
        <input v-model="form.email" required type="email" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
      </div>

      <div class="sm:col-span-1">
        <label class="block text-sm font-medium text-slate-700">Phone Number</label>
        <input v-model="form.phone" type="tel" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
      </div>

      <div class="sm:col-span-1">
        <label class="block text-sm font-medium text-slate-700">LinkedIn URL</label>
        <input v-model="form.linkedinUrl" type="url" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="https://linkedin.com/in/...">
      </div>

      <div class="sm:col-span-1">
        <label class="block text-sm font-medium text-slate-700">Lead Value ($)</label>
        <input v-model.number="form.value" required type="number" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
      </div>

      <div class="sm:col-span-1">
        <label class="block text-sm font-medium text-slate-700">Lead Score (0-100)</label>
        <input v-model.number="form.score" required type="number" min="0" max="100" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
      </div>

      <div class="sm:col-span-1">
        <label class="block text-sm font-medium text-slate-700">Assigned Rep</label>
        <input v-model="form.assignedRep" type="text" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border">
      </div>

      <div class="sm:col-span-1">
        <label class="block text-sm font-medium text-slate-700">Priority</label>
        <select v-model="form.priority" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div class="sm:col-span-2">
        <label class="block text-sm font-medium text-slate-700">Status</label>
        <select v-model="form.status" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white">
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="proposal_sent">Proposal Sent</option>
          <option value="negotiation">Negotiation</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-4 border-t border-slate-100">
      <UiButton variant="secondary" @click="emit('close')" type="button">Cancel</UiButton>
      <UiButton variant="primary" type="submit" :disabled="isSaving">Save Changes</UiButton>
    </div>
  </form>
</template>
