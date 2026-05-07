<script setup lang="ts">
import { ref } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import type { Tag, TagCategory } from '~/types/lead';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['close']);
const store = useLeadsStore();

const newTag = ref<Partial<Tag>>({
  name: '',
  color: 'slate',
  category: 'Custom',
  description: '',
  usageCount: 0
});

const categories: TagCategory[] = ['Priority', 'Industry', 'Lead Type', 'Custom'];
const colors = ['red', 'amber', 'emerald', 'blue', 'indigo', 'purple', 'pink', 'slate', 'orange'];

function saveNewTag() {
  if (newTag.value.name) {
    store.addGlobalTag(newTag.value as Tag);
    newTag.value = {
      name: '',
      color: 'slate',
      category: 'Custom',
      description: '',
      usageCount: 0
    };
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div>
          <h2 class="text-lg font-bold text-slate-900">Tag Management</h2>
          <p class="text-xs text-slate-500">Configure global tags, colors, and categories.</p>
        </div>
        <button @click="emit('close')" class="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- List of Tags -->
        <div class="space-y-4">
          <h3 class="text-sm font-semibold text-slate-700">Global Registry</h3>
          <div class="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <div 
              v-for="tag in store.globalTags" 
              :key="tag.name"
              class="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 group hover:border-slate-200 hover:shadow-sm transition-all"
            >
              <div class="flex items-center gap-3">
                <div :class="`h-3 w-3 rounded-full bg-${tag.color}-500 shadow-sm shadow-${tag.color}-200`"></div>
                <div>
                  <div class="text-xs font-bold text-slate-900">{{ tag.name }}</div>
                  <div class="text-[10px] text-slate-400">{{ tag.category }} • {{ tag.usageCount }} leads</div>
                </div>
              </div>
              <button @click="store.deleteGlobalTag(tag.name)" class="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Add New Tag Form -->
        <div class="space-y-6">
          <h3 class="text-sm font-semibold text-slate-700">Create New Tag</h3>
          <div class="space-y-4 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
            <div>
              <label class="block text-[10px] font-bold text-indigo-900 uppercase tracking-wider mb-1">Tag Name</label>
              <input 
                v-model="newTag.name"
                type="text" 
                placeholder="e.g. AI Specialist"
                class="w-full px-3 py-2 text-xs rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-[10px] font-bold text-indigo-900 uppercase tracking-wider mb-1">Category</label>
                <select 
                  v-model="newTag.category"
                  class="w-full px-3 py-2 text-xs rounded-xl border-slate-200 bg-white shadow-sm"
                >
                  <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
              <div>
                <label class="block text-[10px] font-bold text-indigo-900 uppercase tracking-wider mb-1">Color</label>
                <div class="flex flex-wrap gap-1.5 mt-1">
                  <button 
                    v-for="color in colors" 
                    :key="color"
                    @click="newTag.color = color"
                    :class="[
                      `h-5 w-5 rounded-full bg-${color}-500 transition-transform`,
                      newTag.color === color ? 'scale-125 ring-2 ring-offset-2 ring-indigo-500 shadow-md' : 'hover:scale-110 shadow-sm'
                    ]"
                  ></button>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-indigo-900 uppercase tracking-wider mb-1">Description (Optional)</label>
              <textarea 
                v-model="newTag.description"
                rows="2"
                placeholder="Brief description..."
                class="w-full px-3 py-2 text-xs rounded-xl border-slate-200 focus:ring-2 focus:ring-indigo-500 shadow-sm"
              ></textarea>
            </div>

            <button 
              @click="saveNewTag"
              class="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all"
            >
              Create Global Tag
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
