<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import UiButton from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
});

useHead({ title: 'Sign In - Skill-Wanderer CRM' });

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);

const isLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const handleLogin = async () => {
  errorMsg.value = '';
  successMsg.value = '';
  isLoading.value = true;
  
  try {
    await authStore.login(email.value, password.value, rememberMe.value);
    successMsg.value = 'Login successful! Redirecting...';
    setTimeout(() => {
      navigateTo('/leads');
    }, 1000);
  } catch (err: any) {
    errorMsg.value = err.message || 'Invalid email or password.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-white tracking-tight">Welcome back</h2>
      <p class="text-slate-400 mt-2">Please enter your details to sign in.</p>
    </div>

    <!-- Alert Messages -->
    <div v-if="errorMsg" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {{ errorMsg }}
    </div>

    <div v-if="successMsg" class="mb-6 p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl text-sm flex items-start">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      {{ successMsg }}
    </div>

    <form class="space-y-5" @submit.prevent="handleLogin">
      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
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
            class="pl-11 appearance-none block w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-inner placeholder-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b2c]/50 focus:border-[#ff6b2c] sm:text-sm transition-all duration-300" 
            placeholder="you@company.com" 
          />
        </div>
      </div>

      <!-- Password -->
      <div>
        <label for="password" class="block text-sm font-medium text-slate-300 mb-2">Password</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
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
            class="pl-11 pr-11 appearance-none block w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-xl shadow-inner placeholder-slate-600 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6b2c]/50 focus:border-[#ff6b2c] sm:text-sm transition-all duration-300" 
            placeholder="••••••••" 
          />
          <button 
            type="button" 
            class="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-[#ff6b2c] focus:outline-none transition-colors"
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
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input 
            id="remember-me" 
            name="remember-me" 
            type="checkbox" 
            v-model="rememberMe"
            class="h-4 w-4 bg-[#0f0f0f] border border-white/20 text-[#ff6b2c] focus:ring-[#ff6b2c] focus:ring-offset-[#1a1a1a] rounded cursor-pointer transition-colors" 
          />
          <label for="remember-me" class="ml-2 block text-sm text-slate-300 cursor-pointer select-none">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <NuxtLink to="/forgot-password" class="font-medium text-[#ff8c42] hover:text-[#ff6b2c] transition-colors">
            Forgot password?
          </NuxtLink>
        </div>
      </div>

      <div class="pt-2">
        <UiButton type="submit" variant="primary" class="w-full py-3.5 text-base font-semibold !rounded-full !bg-gradient-to-r !from-[#ff8c42] !to-[#ff6b2c] text-white !border-none shadow-[0_0_15px_rgba(255,107,44,0.3)] hover:shadow-[0_0_25px_rgba(255,107,44,0.5)] hover:scale-[1.02] transition-all duration-300 focus:!ring-2 focus:!ring-offset-2 focus:!ring-offset-[#1a1a1a] focus:!ring-[#ff6b2c]" :disabled="isLoading">
          <svg v-if="isLoading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isLoading ? 'Signing in...' : 'Sign in' }}
        </UiButton>
      </div>
    </form>

  </div>
</template>
