<script setup lang="ts">
import { ref } from 'vue';
import type { Lead } from '~/types/lead';
import { useLeadActions } from '~/composables/useLeadActions';
import UiButton from '~/components/ui/Button.vue';

const props = defineProps<{
  lead: Lead;
}>();

const { createNote } = useLeadActions();
const newNoteContent = ref('');

const submitNote = () => {
  if (newNoteContent.value.trim()) {
    createNote(props.lead.id, newNoteContent.value.trim());
    newNoteContent.value = '';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  });
};
</script>

<template>
  <section>
    <h3 class="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Notes</h3>
    
    <!-- Add Note -->
    <div class="mb-6">
      <div class="mt-2">
        <textarea 
          v-model="newNoteContent" 
          rows="3" 
          class="block w-full rounded-md border-0 py-2.5 px-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-colors" 
          placeholder="Add a note..."
        ></textarea>
      </div>
      <div class="mt-2 flex justify-end">
        <UiButton variant="primary" @click="submitNote" :disabled="!newNoteContent.trim()">Add Note</UiButton>
      </div>
    </div>

    <!-- Notes List -->
    <div v-if="lead.notes && lead.notes.length > 0" class="space-y-6">
      <div v-for="note in lead.notes" :key="note.id" class="flex gap-x-4">
        <div class="h-10 w-10 flex-none rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shadow-sm overflow-hidden">
          <span class="text-slate-500 font-medium text-sm">{{ note.authorName?.charAt(0) || 'U' }}</span>
        </div>
        <div class="flex-auto rounded-xl ring-1 ring-inset ring-slate-200 p-4 bg-slate-50 shadow-sm hover:shadow transition-shadow">
          <div class="flex justify-between gap-x-4">
            <div class="py-0.5 text-sm leading-5 text-slate-500">
              <span class="font-medium text-slate-900">{{ note.authorName || 'Unknown User' }}</span> left a note
            </div>
            <time :datetime="note.createdAt" class="flex-none py-0.5 text-xs leading-5 text-slate-500">{{ formatDate(note.createdAt) }}</time>
          </div>
          <p class="mt-2 text-sm leading-6 text-slate-700 whitespace-pre-wrap">{{ note.content }}</p>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-6 text-sm text-slate-500 border border-dashed border-slate-300 rounded-lg bg-slate-50">
      No notes yet. Add one above!
    </div>
  </section>
</template>
