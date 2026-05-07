<script setup lang="ts">
import type { Lead } from '~/types/lead';

const props = defineProps<{
  lead: Lead;
}>();

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short', day: 'numeric'
  });
};

const getIcon = (type?: string) => {
  switch (type) {
    case 'call': return '📞';
    case 'email': return '✉️';
    case 'meeting': return '📅';
    case 'note': return '📝';
    default: return '✨';
  }
};

const getColor = (type?: string) => {
  switch (type) {
    case 'call': return 'bg-blue-500';
    case 'email': return 'bg-indigo-500';
    case 'meeting': return 'bg-purple-500';
    case 'note': return 'bg-yellow-500';
    default: return 'bg-green-500';
  }
};

// Fallback mock activities if none provided
const mockActivities = [
  { id: '1', type: 'call', description: `Discovery call with ${props.lead.name}`, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { id: '2', type: 'system', description: 'Lead created via Website Form', createdAt: props.lead.createdAt },
];
</script>

<template>
  <section>
    <h3 class="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Recent Activity</h3>
    <div class="flow-root">
      <ul role="list" class="-mb-8">
        <li v-for="(activity, index) in (lead.activities?.length ? lead.activities : mockActivities)" :key="activity.id">
          <div class="relative pb-8">
            <span v-if="index !== (lead.activities?.length ? lead.activities.length : mockActivities.length) - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-slate-200" aria-hidden="true"></span>
            <div class="relative flex space-x-3">
              <div>
                <span :class="[getColor(activity.type), 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white text-white text-xs shadow-sm z-10']">
                  {{ getIcon(activity.type) }}
                </span>
              </div>
              <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                <div>
                  <p class="text-sm text-slate-700" v-html="activity.description"></p>
                </div>
                <div class="whitespace-nowrap text-right text-sm text-slate-500">
                  <time :datetime="activity.createdAt">{{ formatDate(activity.createdAt) }}</time>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
