<script setup lang="ts">
navigator.serviceWorker.addEventListener("message", (event) => {
  console.log("Message received: ", event);
});
</script>

<template>
  <div>
    <NuxtPwaAssets />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
