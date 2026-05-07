import { $fetch } from 'ofetch';
import { navigateTo } from '#imports';

export const useApi = $fetch.create({
  baseURL: '/api',
  async onResponseError({ response }) {
    if (response.status === 401) {
      // Direct navigation in ofetch interceptor
      await navigateTo('/login');
    }
  }
});
