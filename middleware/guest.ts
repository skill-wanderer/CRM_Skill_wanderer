import { defineNuxtRouteMiddleware, navigateTo } from '#imports';

export default defineNuxtRouteMiddleware((to, from) => {
  // Mock authentication check
  const isAuthenticated = false;
  
  if (isAuthenticated) {
    return navigateTo('/');
  }
});
