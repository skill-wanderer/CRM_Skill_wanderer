<script setup lang="ts">
import { ref } from 'vue';
import UiButton from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
});

useHead({ title: 'Forgot Password - SW CRM' });

const email = ref('');
const isLoading = ref(false);
const successMsg = ref('');
const errorMsg = ref('');

const handleReset = async () => {
  errorMsg.value = '';
  successMsg.value = '';
  isLoading.value = true;
  
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  isLoading.value = false;
  successMsg.value = 'If an account exists, a password reset link has been sent to your email.';
};
</script>

<template>
  <div>
    <div class="mb-8">
      <!-- Back button -->
      <NuxtLink to="/login" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to login
      </NuxtLink>
      
      <h2 class="text-2xl font-bold text-slate-900">Forgot password?</h2>
      <p class="text-slate-500 mt-1">No worries, we'll send you reset instructions.</p>
    </div>

    <!-- Alert Messages -->
    <div v-if="successMsg" class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      {{ successMsg }}
    </div>

    <form v-if="!successMsg" class="space-y-5" @submit.prevent="handleReset">
      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          </div>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            v-model="email"
            class="pl-10 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" 
            placeholder="you@company.com" 
          />
        </div>
      </div>

      <div>
        <UiButton type="submit" variant="primary" class="w-full py-2.5 text-base" :disabled="isLoading">
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Sending...' : 'Reset password' }}
        </UiButton>
      </div>
    </form>
    
    <div v-else class="mt-6">
      <UiButton @click="navigateTo('/login')" variant="secondary" class="w-full py-2.5 text-base">
        Return to login
      </UiButton>
    </div>
  </div>
</template>
