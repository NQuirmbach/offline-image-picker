<script setup lang="ts">
const auth = useAuthStore();
</script>

<template>
  <div v-if="auth.session">
    <span>Eingeloggt als: </span>
    <b>{{ auth.session.user.email }}</b>
  </div>
  <hr />
  <NuxtLink class="button" href="project/create">Create new project</NuxtLink>
  <ProjectList />
</template>

<style scoped>
hr {
  @apply my-4;
}
</style>
