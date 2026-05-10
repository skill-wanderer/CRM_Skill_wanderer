<script setup lang="ts">
import { ref, watch } from 'vue';
import { PencilIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  modelValue: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'textarea';
  isLinkedIn?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'save', value: string): void;
}>();

const isEditing = ref(false);
const editValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  editValue.value = newVal;
});

const startEdit = () => {
  editValue.value = props.modelValue;
  isEditing.value = true;
};

const cancelEdit = () => {
  editValue.value = props.modelValue;
  isEditing.value = false;
};

const saveEdit = () => {
  emit('update:modelValue', editValue.value);
  emit('save', editValue.value);
  isEditing.value = false;
};
</script>

<template>
  <div>
    <!-- Edit Mode -->
    <div v-if="isEditing" class="space-y-2">
      <textarea 
        v-if="type === 'textarea'"
        v-model="editValue"
        class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        rows="3"
        @keydown.esc="cancelEdit"
      ></textarea>
      <input 
        v-else
        :type="type || 'text'"
        v-model="editValue"
        class="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        @keydown.enter="saveEdit"
        @keydown.esc="cancelEdit"
      />
      <div class="flex items-center gap-2">
        <button 
          @click="saveEdit" 
          class="inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
        >
          Save
        </button>
        <button 
          @click="cancelEdit" 
          class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>

    <!-- View Mode -->
    <div v-else class="group flex items-start justify-between gap-2">
      <!-- LinkedIn specific rendering -->
      <div v-if="isLinkedIn" class="flex-1 min-w-0">
        <div v-if="modelValue">
          <a :href="modelValue" target="_blank" class="inline-flex items-center gap-1.5 text-[#0A66C2] hover:underline break-all">
            <svg class="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" />
            </svg>
            {{ modelValue }}
          </a>
        </div>
        <button v-else @click="startEdit" class="text-indigo-600 hover:underline text-sm font-medium">
          + Add {{ label }}
        </button>
      </div>

      <!-- General field rendering -->
      <div v-else class="flex-1 min-w-0">
        <div v-if="modelValue" :class="{'break-words': true, 'text-slate-600': type === 'textarea'}">
          {{ modelValue }}
        </div>
        <button v-else @click="startEdit" class="text-indigo-600 hover:underline text-sm font-medium">
          + Add field
        </button>
      </div>

      <button 
        v-if="modelValue"
        @click="startEdit" 
        class="p-1 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors flex-shrink-0" 
        title="Edit"
      >
        <PencilIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
