<template>
  <div>
    <h2>PWA Info</h2>
    <pre>{{ JSON.stringify($pwa, null, 2) }}</pre>
  </div>
</template>

<script setup lang="ts">
const { $pwa } = useNuxtApp();
</script>
