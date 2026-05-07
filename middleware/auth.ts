import { defineNuxtRouteMiddleware, navigateTo, useCookie } from '#imports';

export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie('auth_token');
  
  if (!token.value && to.path !== '/login') {
    return navigateTo('/login');
  }
});

