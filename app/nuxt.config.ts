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
    baseURL: isDev ? "" : "/offline-image-picker/",
  },
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
    registerType: "prompt",
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: "Offline Image Picker",
      short_name: "offline-image-picker",
      description: "Offline Image Picker APp",
      theme_color: "#778da9",
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
