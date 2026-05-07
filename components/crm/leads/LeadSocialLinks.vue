<script setup lang="ts">
import { ref } from 'vue';
import type { Lead } from '~/types/lead';
import { useLeadsStore } from '~/stores/leads';
import { useToast } from '~/composables/useToast';
import { ChevronDownIcon, ChevronUpIcon, LinkIcon, DocumentDuplicateIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  lead: Lead;
}>();

const store = useLeadsStore();
const { addToast } = useToast();

const isExpanded = ref(false);
const toggleExpand = () => isExpanded.value = !isExpanded.value;

const platforms = [
  { key: 'linkedinUrl', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z', color: 'text-[#0A66C2]' },
  { key: 'twitterUrl', label: 'Twitter/X', placeholder: 'https://twitter.com/username', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', color: 'text-slate-800' },
  { key: 'githubUrl', label: 'GitHub', placeholder: 'https://github.com/username', icon: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12', color: 'text-slate-800' },
  { key: 'discordUrl', label: 'Discord', placeholder: 'https://discord.com/users/id', icon: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z', color: 'text-indigo-500' },
  { key: 'instagramUrl', label: 'Instagram', placeholder: 'https://instagram.com/username', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z', color: 'text-pink-600' },
  { key: 'facebookUrl', label: 'Facebook', placeholder: 'https://facebook.com/username', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z', color: 'text-blue-700' },
  { key: 'websiteUrl', label: 'Website', placeholder: 'https://example.com', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z', color: 'text-slate-500' }
];

const editingKey = ref<string | null>(null);
const editValue = ref('');
const inputError = ref('');

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    addToast('Link copied to clipboard', 'success');
  } catch (err) {
    addToast('Failed to copy link', 'error');
  }
};

const validateUrl = (url: string) => {
  if (!url) return true;
  try {
    new URL(url.startsWith('http') ? url : `https://${url}`);
    return true;
  } catch {
    return false;
  }
};

const startEdit = (key: string, currentVal: string = '') => {
  editingKey.value = key;
  editValue.value = currentVal;
  inputError.value = '';
};

const cancelEdit = () => {
  editingKey.value = null;
  editValue.value = '';
  inputError.value = '';
};

const saveEdit = async (key: string) => {
  let val = editValue.value.trim();
  if (val && !val.startsWith('http')) {
    val = `https://${val}`;
  }
  
  if (val && !validateUrl(val)) {
    inputError.value = 'Please enter a valid URL';
    return;
  }
  
  try {
    await store.updateLead(props.lead.id, { [key]: val });
    addToast('Social link updated', 'success');
    editingKey.value = null;
  } catch (error) {
    addToast('Failed to update social link', 'error');
  }
};
</script>

<template>
  <section class="mt-8 border border-slate-200 rounded-xl bg-white overflow-hidden shadow-sm hover:shadow transition-shadow">
    <button 
      @click="toggleExpand" 
      class="w-full px-5 py-4 flex items-center justify-between bg-slate-50 hover:bg-slate-100 transition-colors focus:outline-none"
    >
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <LinkIcon class="w-4 h-4" />
        </div>
        <h3 class="text-sm font-semibold text-slate-900">Social Links</h3>
      </div>
      <div class="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <span>{{ isExpanded ? 'Hide' : 'Show' }} Links</span>
        <ChevronUpIcon v-if="isExpanded" class="w-5 h-5" />
        <ChevronDownIcon v-else class="w-5 h-5" />
      </div>
    </button>
    
    <transition
      enter-active-class="transition-[max-height,opacity] duration-300 ease-in-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[1000px] opacity-100"
      leave-active-class="transition-[max-height,opacity] duration-300 ease-in-out"
      leave-from-class="max-h-[1000px] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-show="isExpanded" class="overflow-hidden">
        <div class="p-5 border-t border-slate-200 space-y-4">
          <div v-for="platform in platforms" :key="platform.key" class="group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
            <!-- Label -->
            <div class="sm:w-32 flex items-center gap-2 flex-shrink-0">
              <svg class="w-5 h-5" :class="platform.color" fill="currentColor" viewBox="0 0 24 24">
                <path :d="platform.icon" />
              </svg>
              <span class="text-sm font-medium text-slate-700">{{ platform.label }}</span>
            </div>
            
            <!-- Value / Edit Form -->
            <div class="flex-1 min-w-0">
              <!-- Edit Mode -->
              <div v-if="editingKey === platform.key" class="space-y-2">
                <div class="flex gap-2">
                  <div class="relative flex-1">
                    <input 
                      type="url" 
                      v-model="editValue" 
                      :placeholder="platform.placeholder"
                      class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      :class="{'ring-red-300 focus:ring-red-500': inputError}"
                      @keydown.enter="saveEdit(platform.key)"
                      @keydown.esc="cancelEdit"
                      autoFocus
                    />
                  </div>
                  <button @click="saveEdit(platform.key)" class="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors">Save</button>
                  <button @click="cancelEdit" class="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-md hover:bg-slate-50 transition-colors">Cancel</button>
                </div>
                <p v-if="inputError" class="text-xs text-red-600">{{ inputError }}</p>
              </div>
              
              <!-- View Mode -->
              <div v-else class="flex items-center justify-between gap-3">
                <div v-if="lead[platform.key as keyof Lead]" class="truncate">
                  <a :href="lead[platform.key as keyof Lead]" target="_blank" rel="noopener noreferrer" class="text-sm text-indigo-600 hover:text-indigo-800 hover:underline truncate">
                    {{ lead[platform.key as keyof Lead] }}
                  </a>
                </div>
                <div v-else class="text-sm text-slate-400 italic">Not provided</div>
                
                <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button v-if="lead[platform.key as keyof Lead]" @click="copyToClipboard(lead[platform.key as keyof Lead] as string)" class="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors" title="Copy to clipboard">
                    <DocumentDuplicateIcon class="w-4 h-4" />
                  </button>
                  <button @click="startEdit(platform.key, (lead[platform.key as keyof Lead] as string) || '')" class="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors text-sm font-medium">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </section>
</template>
