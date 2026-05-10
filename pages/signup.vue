<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';
import UiButton from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
});

useHead({ title: 'Sign Up - SW CRM' });

const authStore = useAuthStore();

const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreeTerms = ref(false);
const showPassword = ref(false);

const isLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

// Password strength calculator
const passwordStrength = computed(() => {
  if (!password.value) return 0;
  let strength = 0;
  if (password.value.length >= 8) strength++;
  if (password.value.match(/[A-Z]/)) strength++;
  if (password.value.match(/[0-9]/)) strength++;
  if (password.value.match(/[^A-Za-z0-9]/)) strength++;
  return strength;
});

const handleSignup = async () => {
  errorMsg.value = '';
  successMsg.value = '';
  
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match.';
    return;
  }
  if (!agreeTerms.value) {
    errorMsg.value = 'You must agree to the Terms & Conditions.';
    return;
  }
  
  isLoading.value = true;
  
  try {
    await authStore.signup(fullName.value, email.value, password.value);
    successMsg.value = 'Account created! Redirecting to login...';
    setTimeout(() => {
      navigateTo('/login');
    }, 1500);
  } catch (err: any) {
    errorMsg.value = err.message || 'Failed to create account. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-slate-900">Create an account</h2>
      <p class="text-slate-500 mt-1">Start managing your leads in seconds.</p>
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

    <form class="space-y-5" @submit.prevent="handleSignup">
      <!-- Full Name -->
      <div>
        <label for="fullName" class="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <input 
            id="fullName" 
            name="fullName" 
            type="text" 
            required 
            v-model="fullName"
            class="pl-10 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" 
            placeholder="John Doe" 
          />
        </div>
      </div>

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

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-slate-700 mb-1">Password</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input 
            id="password" 
            name="password" 
            :type="showPassword ? 'text' : 'password'" 
            required 
            v-model="password"
            class="pl-10 pr-10 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" 
            placeholder="••••••••" 
          />
          <button 
            type="button" 
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-600 focus:outline-none"
            @click="showPassword = !showPassword"
          >
            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          </button>
        </div>
        <!-- Password Strength Indicator -->
        <div v-if="password" class="mt-2 flex items-center space-x-1">
          <div class="h-1 flex-1 rounded-full bg-slate-200 overflow-hidden">
            <div class="h-full transition-all" 
                 :class="{
                   'w-1/4 bg-red-500': passwordStrength === 1,
                   'w-2/4 bg-yellow-500': passwordStrength === 2,
                   'w-3/4 bg-blue-500': passwordStrength === 3,
                   'w-full bg-green-500': passwordStrength === 4
                 }"></div>
          </div>
          <span class="text-xs text-slate-500 min-w-[60px] text-right">
            {{ ['Weak', 'Fair', 'Good', 'Strong'][passwordStrength - 1] || 'Too short' }}
          </span>
        </div>
      </div>

      <!-- Confirm Password -->
      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password" 
            required 
            v-model="confirmPassword"
            class="pl-10 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" 
            placeholder="••••••••" 
          />
        </div>
      </div>

      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input 
            id="terms" 
            name="terms" 
            type="checkbox" 
            required
            v-model="agreeTerms"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 rounded cursor-pointer" 
          />
        </div>
        <div class="ml-2 text-sm">
          <label for="terms" class="font-medium text-slate-700 cursor-pointer">
            I agree to the <a href="#" class="text-indigo-600 hover:text-indigo-500">Terms</a> and <a href="#" class="text-indigo-600 hover:text-indigo-500">Privacy Policy</a>
          </label>
        </div>
      </div>

      <div>
        <UiButton type="submit" variant="primary" class="w-full py-2.5 text-base" :disabled="isLoading">
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Creating account...' : 'Create Account' }}
        </UiButton>
      </div>
    </form>

    <div class="mt-8 text-center text-sm text-slate-600">
      Already have an account? 
      <NuxtLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">
        Sign in
      </NuxtLink>
    </div>
  </div>
</template>
