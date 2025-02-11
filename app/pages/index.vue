<script setup lang="ts">
const message = ref<string | null>(null);
const { $pwa } = useNuxtApp();
const auth = useAuthStore();

async function handleInstall() {
  message.value = null;
  const result = await $pwa?.install();
  message.value = result ? JSON.stringify(result) : "empty";
}
async function handleUpdateSW() {
  message.value = null;
  await $pwa?.updateServiceWorker(true);
}
async function handleGetSWRegistration() {
  message.value = null;
  const result = $pwa?.getSWRegistration();
  message.value = result ? JSON.stringify(result) : "empty";
}
</script>

<template>
  <div>
    <h2>PWA Info</h2>
    <pre>{{ JSON.stringify($pwa, null, 2) }}</pre>
  </div>

  <div class="flex items-centers space-x-4 my-4">
    <button @click="handleInstall">Install PWA</button>
    <button @click="handleUpdateSW">Update SW</button>
    <button @click="handleGetSWRegistration">Get SW registration</button>
  </div>
  <pre v-if="message">{{ message }}</pre>

  <hr />

  <div v-if="auth.session">
    <span>Eingeloggt als: </span>
    <b>{{ auth.session.user.email }}</b>
  </div>
</template>

<style scoped>
button {
  @apply p-2 bg-gray-600 rounded-sm text-white;
}
hr {
  @apply my-4;
}
</style>
