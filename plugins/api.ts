import { defineNuxtPlugin, navigateTo } from '#imports';
import { $fetch } from 'ofetch';

export default defineNuxtPlugin((nuxtApp) => {
  const api = $fetch.create({
    baseURL: '/api',
    async onResponseError({ response }) {
      if (response.status === 401) {
        await nuxtApp.runWithContext(() => navigateTo('/login'));
      }
    }
  });

  return {
    provide: {
      api
    }
  };
});
