import type { RuntimeCaching } from "workbox-build";

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
  experimental: {
    appManifest: true,
  },
  modules: ["@vite-pwa/nuxt", "@nuxtjs/tailwindcss", "@pinia/nuxt"],

  pwa: {
    strategies: "injectManifest",
    srcDir: "service-worker",
    filename: "sw.ts",
    registerType: "prompt",
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: "my-pwa-app",
      short_name: "my-pwa-app",
      description: "my-pwa-app",
      theme_color: "#f4a261",
    },

    injectManifest: {
      globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
    },

    devOptions: {
      enabled: true,
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
