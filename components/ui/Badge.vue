<script setup lang="ts">
const props = defineProps<{
  status: 'new' | 'contacted' | 'qualified' | 'proposal_sent' | 'negotiation' | 'won' | 'lost' | string;
}>();

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  qualified: 'bg-indigo-100 text-indigo-800',
  proposal_sent: 'bg-purple-100 text-purple-800',
  negotiation: 'bg-orange-100 text-orange-800',
  won: 'bg-green-100 text-green-800',
  lost: 'bg-red-100 text-red-800',
};

const defaultColor = 'bg-slate-100 text-slate-800';
</script>

<template>
  <span :class="['inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize', statusColors[status] || defaultColor]">
    <slot>{{ status }}</slot>
  </span>
</template>
