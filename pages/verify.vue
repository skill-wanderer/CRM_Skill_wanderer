<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import UiButton from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
});

useHead({ title: 'Verify Email - SW CRM' });

const otpFields = ref<string[]>(['', '', '', '', '', '']);
const inputRefs = ref<HTMLInputElement[]>([]);
const isLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');
const timer = ref(60);
let interval: any;

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

const startTimer = () => {
  timer.value = 60;
  clearInterval(interval);
  interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

const handleInput = (e: Event, index: number) => {
  const input = e.target as HTMLInputElement;
  const val = input.value;
  
  // Ensure only one character
  if (val.length > 1) {
    otpFields.value[index] = val.slice(0, 1);
  }
  
  // Move to next input if value is entered
  if (val && index < 5) {
    inputRefs.value[index + 1]?.focus();
  }
};

const handleKeydown = (e: KeyboardEvent, index: number) => {
  if (e.key === 'Backspace' && !otpFields.value[index] && index > 0) {
    // Move to previous input on backspace if current is empty
    inputRefs.value[index - 1]?.focus();
  }
};

const handlePaste = (e: ClipboardEvent) => {
  e.preventDefault();
  const pastedData = e.clipboardData?.getData('text').slice(0, 6);
  if (!pastedData) return;
  
  if (/^\d+$/.test(pastedData)) {
    for (let i = 0; i < pastedData.length; i++) {
      if (i < 6) {
        otpFields.value[i] = pastedData[i];
      }
    }
    // Focus the next empty input or the last one
    const focusIndex = Math.min(pastedData.length, 5);
    inputRefs.value[focusIndex]?.focus();
  }
};

const handleVerify = async () => {
  const code = otpFields.value.join('');
  if (code.length < 6) {
    errorMsg.value = 'Please enter all 6 digits.';
    return;
  }
  
  errorMsg.value = '';
  isLoading.value = true;
  
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  isLoading.value = false;
  successMsg.value = 'Email verified successfully! Redirecting...';
  
  setTimeout(() => {
    navigateTo('/login');
  }, 1500);
};

const resendCode = async () => {
  if (timer.value > 0) return;
  
  isLoading.value = true;
  // Mock API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  isLoading.value = false;
  
  startTimer();
  // Show a toast or small message here in a real app
};

// Expose ref to bind
const setInputRef = (el: any, index: number) => {
  if (el) {
    inputRefs.value[index] = el;
  }
};
</script>

<template>
  <div>
    <div class="mb-8 text-center">
      <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-slate-900">Check your email</h2>
      <p class="text-slate-500 mt-2">
        We sent a verification code to <span class="font-medium text-slate-900">you@company.com</span>
      </p>
    </div>

    <!-- Alert Messages -->
    <div v-if="errorMsg" class="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ errorMsg }}
    </div>

    <div v-if="successMsg" class="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      {{ successMsg }}
    </div>

    <form @submit.prevent="handleVerify">
      <div class="flex justify-between gap-2 mb-8">
        <input 
          v-for="(field, index) in otpFields" 
          :key="index"
          :ref="el => setInputRef(el, index)"
          type="text" 
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="1"
          v-model="otpFields[index]"
          @input="handleInput($event, index)"
          @keydown="handleKeydown($event, index)"
          @paste="handlePaste"
          class="w-12 h-14 text-center text-xl font-semibold border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
        />
      </div>

      <UiButton type="submit" variant="primary" class="w-full py-2.5 text-base" :disabled="isLoading">
        <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ isLoading ? 'Verifying...' : 'Verify Email' }}
      </UiButton>
    </form>

    <div class="mt-8 text-center text-sm">
      <p class="text-slate-600 mb-2">Didn't receive the email?</p>
      <button 
        type="button" 
        @click="resendCode" 
        :disabled="timer > 0 || isLoading"
        :class="[
          'font-medium transition-colors',
          timer > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-indigo-600 hover:text-indigo-500'
        ]"
      >
        Click to resend {{ timer > 0 ? `(${timer}s)` : '' }}
      </button>
    </div>
    
    <div class="mt-6 text-center">
      <NuxtLink to="/login" class="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to login
      </NuxtLink>
    </div>
  </div>
</template>
