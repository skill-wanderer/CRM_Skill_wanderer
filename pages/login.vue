<script setup lang="ts">
import UiButton from '~/components/ui/Button.vue';

definePageMeta({
  layout: 'auth',
  middleware: ['guest']
});

useHead({ title: 'Sign In - CRM Enterprise' });

const email = ref('');
const password = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  isLoading.value = true;
  // Mock login delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  isLoading.value = false;
  navigateTo('/');
};
</script>

<template>
  <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
    <div class="rounded-md shadow-sm space-y-4">
      <div>
        <label for="email-address" class="sr-only">Email address</label>
        <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email address" v-model="email" />
      </div>
      <div>
        <label for="password" class="sr-only">Password</label>
        <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password" v-model="password" />
      </div>
    </div>

    <div>
      <UiButton type="submit" variant="primary" class="w-full" :disabled="isLoading">
        {{ isLoading ? 'Signing in...' : 'Sign in' }}
      </UiButton>
    </div>
  </form>
</template>
