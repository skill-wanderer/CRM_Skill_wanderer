// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 1. Set compatibility date to opt-in to modern Cloudflare features
  compatibilityDate: '2024-11-01',

  nitro: {
    // 2. Use the modern module worker preset
    preset: "cloudflare-module",
    cloudflare: {
      // 3. Automatically generate deployment metadata for Wrangler
      deployConfig: true,
      // 4. Enable Node.js built-ins support (required for many Nuxt apps)
      nodeCompat: true 
    }
  },

  // Your existing modules
  modules:,

  css: ["~/assets/css/main.css"],

  devtools: { enabled: true },

  app: {
    head: {
      title: "SW CRM",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
      ],
    },
  },
});