<script setup lang="ts">
import { ref, computed } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import TagBadge from './TagBadge.vue';

const store = useLeadsStore();
const isOpen = ref(false);

const availableTags = computed(() => {
  return store.globalTags.filter(t => !store.filters.tagNames.includes(t.name));
});

const selectedTags = computed(() => {
  return store.globalTags.filter(t => store.filters.tagNames.includes(t.name));
});

function toggleTag(tagName: string) {
  if (store.filters.tagNames.includes(tagName)) {
    store.filters.tagNames = store.filters.tagNames.filter(t => t !== tagName);
  } else {
    store.filters.tagNames.push(tagName);
  }
}

function clearFilters() {
  store.filters.tagNames = [];
}
</script>

<template>
  <div class="flex flex-col gap-3 py-4 border-b border-slate-100 bg-white/50 backdrop-blur-sm sticky top-0 z-20">
    <div class="flex items-center gap-4 px-2">
      <!-- Label & Dropdown Toggle -->
      <div class="flex items-center gap-2">
        <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filter Tags:</span>
        <div class="relative">
          <button 
            @click="isOpen = !isOpen"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white text-xs font-medium text-slate-700 hover:border-slate-300 hover:shadow-sm transition-all"
          >
            <span>Add Tag</span>
            <svg class="h-3.5 w-3.5" :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown -->
          <div v-if="isOpen" class="absolute left-0 mt-2 w-56 rounded-xl bg-white shadow-xl ring-1 ring-slate-200 z-50 overflow-hidden">
            <div class="p-2 border-b border-slate-100">
              <input 
                type="text" 
                placeholder="Search tags..." 
                class="w-full px-3 py-1.5 text-xs border-0 bg-slate-50 rounded-lg focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div class="max-h-64 overflow-y-auto p-2 flex flex-col gap-1">
              <button 
                v-for="tag in availableTags" 
                :key="tag.name"
                @click="toggleTag(tag.name); isOpen = false"
                class="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors text-left group"
              >
                <div :class="`h-2 w-2 rounded-full bg-${tag.color}-500`"></div>
                <span class="text-xs font-medium text-slate-700">{{ tag.name }}</span>
                <span class="ml-auto text-[10px] text-slate-400 opacity-0 group-hover:opacity-100">{{ tag.usageCount }}</span>
              </button>
              <div v-if="availableTags.length === 0" class="p-4 text-center text-xs text-slate-400">
                No more tags available
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Active Filters -->
      <div class="flex-1 flex flex-wrap gap-2">
        <TagBadge 
          v-for="tag in selectedTags" 
          :key="tag.name" 
          :tag="tag" 
          show-remove 
          @remove="toggleTag(tag.name)" 
        />
        
        <button 
          v-if="store.filters.tagNames.length > 0"
          @click="clearFilters"
          class="text-xs text-slate-400 hover:text-red-500 transition-colors font-medium px-2"
        >
          Clear All
        </button>
      </div>
    </div>
  </div>
</template>
