<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Lead, Tag } from '~/types/lead';
import { useLeadsStore } from '~/stores/leads';
import TagBadge from './TagBadge.vue';
import TagManagerModal from './TagManagerModal.vue';

const props = defineProps<{
  lead: Lead;
}>();

const store = useLeadsStore();
const isAdding = ref(false);
const showManager = ref(false);
const search = ref('');

const leadTags = computed(() => {
  return store.globalTags.filter(t => props.lead.tags.includes(t.name));
});

const suggestions = computed(() => {
  if (!search.value) return store.globalTags.filter(t => !props.lead.tags.includes(t.name)).slice(0, 5);
  return store.globalTags.filter(t => 
    !props.lead.tags.includes(t.name) && 
    t.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

function toggleTag(tagName: string) {
  store.toggleLeadTag(props.lead.id, tagName);
  search.value = '';
}

function handleEnter() {
  if (suggestions.value.length > 0) {
    toggleTag(suggestions.value[0].name);
  }
}
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between border-b border-slate-100 pb-2">
      <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wider">Tags</h3>
      <button 
        @click="showManager = true"
        class="text-[10px] font-bold text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest flex items-center gap-1"
      >
        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Manage Registry
      </button>
    </div>

    <div class="flex flex-wrap gap-2.5 items-center">
      <transition-group 
        enter-active-class="transition duration-300 ease-out transform"
        enter-from-class="scale-95 opacity-0"
        enter-to-class="scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in transform"
        leave-from-class="scale-100 opacity-100"
        leave-to-class="scale-95 opacity-0"
      >
        <TagBadge 
          v-for="tag in leadTags" 
          :key="tag.name" 
          :tag="tag" 
          show-remove 
          @remove="toggleTag(tag.name)" 
        />
      </transition-group>
      
      <!-- Smart Add Input -->
      <div class="relative">
        <div v-if="isAdding" class="flex flex-col">
          <input 
            v-model="search" 
            @keyup.enter="handleEnter"
            @keyup.esc="isAdding = false; search = ''"
            type="text" 
            autoFocus
            class="block w-40 rounded-full border-0 py-1.5 px-4 text-xs text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-all" 
            placeholder="Search or add..." 
          />
          
          <!-- Suggestions Popover -->
          <div v-if="search || suggestions.length" class="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl ring-1 ring-slate-200 z-50 overflow-hidden py-1">
            <button 
              v-for="tag in suggestions" 
              :key="tag.name"
              @click="toggleTag(tag.name)"
              class="w-full flex items-center gap-2 px-3 py-2 hover:bg-slate-50 text-left transition-colors group"
            >
              <div :class="`h-2 w-2 rounded-full bg-${tag.color}-500`"></div>
              <span class="text-xs font-medium text-slate-700">{{ tag.name }}</span>
            </button>
          </div>
        </div>
        
        <button 
          v-else 
          @click="isAdding = true" 
          class="inline-flex items-center rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-500 hover:border-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all group"
        >
          <span class="mr-1 opacity-50 group-hover:opacity-100">+</span>
          Add Tag
        </button>
      </div>
    </div>

    <!-- Suggested Tags (Quick Add) -->
    <div v-if="!isAdding && suggestions.length > 0" class="flex flex-col gap-2">
      <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Suggested:</span>
      <div class="flex flex-wrap gap-2">
        <button 
          v-for="tag in suggestions.slice(0, 3)" 
          :key="tag.name"
          @click="toggleTag(tag.name)"
          class="text-[10px] font-bold text-indigo-500 hover:text-indigo-700 bg-indigo-50/50 px-2 py-1 rounded-lg border border-indigo-100 hover:bg-indigo-100 transition-all"
        >
          + {{ tag.name }}
        </button>
      </div>
    </div>

    <TagManagerModal :is-open="showManager" @close="showManager = false" />
  </section>
</template>
