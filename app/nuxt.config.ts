let isDev = process.env.NODE_ENV !== "production";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
    // and more...
  },
  app: {
    head: {
      title: "Offline Image Picker",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  css: ["~/assets/css/main.css"],
  ssr: false,
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
    },
  },

  nitro: {
    prerender: {
      routes: ["/"],
    },
  },

  modules: ["@vite-pwa/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],
  pwa: {
    registerType: "autoUpdate",
    pwaAssets: {
      disabled: false,
      config: true,
    },
    manifest: {
      name: "Offline Image Picker",
      short_name: "offline-image-picker",
      description: "Offline Image Picker APp",
      theme_color: "#778da9",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/",
      id: "oip.nquirmbach.info",
      scope: "/",
      icons: [
        {
          src: "/icons/logo_192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/icons/logo_512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      screenshots: [],
      categories: ["utilities"],
      orientation: "natural",
      dir: "ltr",
    },

    workbox: {
      globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      suppressWarnings: true,
      navigateFallback: "/",
      navigateFallbackAllowlist: [/^\/$/],
      type: "module",
    },
    registerWebManifestInRouteRules: true,
    client: {
      installPrompt: true,
    },
  },

  compatibilityDate: "2025-02-10",
});
