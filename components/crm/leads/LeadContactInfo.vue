<script setup lang="ts">
import type { Lead } from '~/types/lead';

const props = defineProps<{
  lead: Lead;
}>();

const formatCurrency = (val: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
</script>

<template>
  <div class="space-y-8">
    <!-- Contact Info -->
    <section>
      <h3 class="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Contact Details</h3>
      <dl class="grid grid-cols-1 gap-y-4">
        <div class="sm:col-span-1">
          <dt class="text-sm font-medium text-slate-500">Email address</dt>
          <dd class="mt-1 text-sm text-slate-900">{{ lead.email }}</dd>
        </div>
        <div class="sm:col-span-1" v-if="lead.phone">
          <dt class="text-sm font-medium text-slate-500">Phone number</dt>
          <dd class="mt-1 text-sm text-slate-900">{{ lead.phone }}</dd>
        </div>

      </dl>
    </section>

    <!-- Sales Info -->
    <section>
      <h3 class="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Sales Information</h3>
      <dl class="grid grid-cols-2 gap-y-4 gap-x-4">
        <div>
          <dt class="text-sm font-medium text-slate-500">Lead Value</dt>
          <dd class="mt-1 text-sm font-semibold text-slate-900">{{ formatCurrency(lead.value) }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-slate-500">Lead Score</dt>
          <dd class="mt-1 text-sm text-slate-900">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">{{ lead.score }} / 100</span>
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-slate-500">Assigned Rep</dt>
          <dd class="mt-1 text-sm text-slate-900">{{ lead.assignedRep || 'Unassigned' }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-slate-500">Created At</dt>
          <dd class="mt-1 text-sm text-slate-900">{{ formatDate(lead.createdAt) }}</dd>
        </div>
      </dl>
    </section>
  </div>
</template>
