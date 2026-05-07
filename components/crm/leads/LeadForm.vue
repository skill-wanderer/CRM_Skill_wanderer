<script setup lang="ts">
import { ref } from 'vue';
import { useLeadsStore } from '~/stores/leads';
import UiButton from '~/components/ui/Button.vue';

const store = useLeadsStore();

const closeForm = () => {
  store.isFormOpen = false;
};

const step = ref(1);

const form = ref({
  name: '',
  company: '',
  email: '',
  phone: '',
  value: 0,
  priority: 'medium' as 'low' | 'medium' | 'high',
});

const nextStep = () => {
  if (step.value < 3) step.value++;
};

const prevStep = () => {
  if (step.value > 1) step.value--;
};

const submit = () => {
  // Mock adding lead
  const newLead = {
    id: String(Date.now()),
    ...form.value,
    score: 50,
    status: 'new' as const,
    tags: [],
    createdAt: new Date().toISOString(),
  };
  store.leads.unshift(newLead);
  store.pagination.total++;
  closeForm();
};
</script>

<template>
  <div v-if="store.isFormOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-slate-900/50 transition-opacity" @click="closeForm"></div>

    <!-- Modal -->
    <div class="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col transform transition-all">
      <div class="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
        <h2 class="text-xl font-semibold text-slate-900">Add New Lead</h2>
        <button @click="closeForm" class="text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200 p-1">✕</button>
      </div>

      <div class="p-6 overflow-y-auto flex-1">
        <!-- Stepper -->
        <div class="flex items-center justify-center mb-8 max-w-md mx-auto">
          <div class="flex flex-col items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors" :class="step >= 1 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'">1</div>
            <div class="text-xs mt-2 font-medium" :class="step >= 1 ? 'text-indigo-600' : 'text-slate-500'">Contact</div>
          </div>
          <div class="w-16 h-1 mx-2 transition-colors" :class="step >= 2 ? 'bg-indigo-600' : 'bg-slate-200'"></div>
          <div class="flex flex-col items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors" :class="step >= 2 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'">2</div>
            <div class="text-xs mt-2 font-medium" :class="step >= 2 ? 'text-indigo-600' : 'text-slate-500'">Company</div>
          </div>
          <div class="w-16 h-1 mx-2 transition-colors" :class="step >= 3 ? 'bg-indigo-600' : 'bg-slate-200'"></div>
          <div class="flex flex-col items-center">
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors" :class="step >= 3 ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'">3</div>
            <div class="text-xs mt-2 font-medium" :class="step >= 3 ? 'text-indigo-600' : 'text-slate-500'">Sales</div>
          </div>
        </div>

        <form @submit.prevent>
          <div v-if="step === 1" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700">Full Name</label>
              <input v-model="form.name" type="text" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="Jane Doe">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700">Email Address</label>
              <input v-model="form.email" type="email" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="jane@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700">Phone Number</label>
              <input v-model="form.phone" type="tel" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="+1 (555) 000-0000">
            </div>
          </div>

          <div v-if="step === 2" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700">Company Name</label>
              <input v-model="form.company" type="text" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="Acme Corp">
            </div>
          </div>

          <div v-if="step === 3" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-slate-700">Estimated Value ($)</label>
              <input v-model.number="form.value" type="number" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="10000">
            </div>
            <div>
              <label class="block text-sm font-medium text-slate-700">Priority</label>
              <select v-model="form.priority" class="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border bg-white">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </form>
      </div>

      <div class="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between">
        <UiButton v-if="step > 1" variant="secondary" @click="prevStep">Back</UiButton>
        <div v-else></div>
        
        <UiButton v-if="step < 3" variant="primary" @click="nextStep">Next</UiButton>
        <UiButton v-else variant="primary" @click="submit">Create Lead</UiButton>
      </div>
    </div>
  </div>
</template>
