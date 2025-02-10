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
</template>

<script setup lang="ts">
const message = ref<string | null>(null);
const { $pwa } = useNuxtApp();

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

<style lang="postcss" scoped>
button {
  @apply p-2 bg-gray-600 rounded-sm text-white;
}
</style>
