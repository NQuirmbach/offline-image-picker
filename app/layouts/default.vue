<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const auth = useAuthStore();

async function handleLogout() {
  await auth.logout();
  navigateTo("login");
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header
      class="bg-blue-600 text-white py-4 px-6 flex items-center justify-between space-x-8"
    >
      <NuxtLink href="/">Offline Image Picker</NuxtLink>

      <nav class="flex-1">
        <ul class="flex space-x-4">
          <li><NuxtLink href="/">Home</NuxtLink></li>
          <li><NuxtLink href="/pwa-info">PWA Info</NuxtLink></li>
        </ul>
      </nav>

      <div v-if="auth.session" class="flex items-center space-x-4">
        <button @click="handleLogout">Logout</button>
      </div>
    </header>

    <main class="flex-grow p-6">
      <slot />
    </main>
  </div>

  <PwaInfo />
</template>
