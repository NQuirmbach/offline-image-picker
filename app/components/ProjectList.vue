<script setup lang="ts">
import { NuxtLink } from "#components";
import type { Tables } from "~/types/database.types.ts";
const { $supabase } = useNuxtApp();

type Project = Tables<"projects">;

const projects = ref<Project[]>([]);
const loading = ref(false);

async function deleteProject(id: string) {
  const { error } = await $supabase.from("projects").delete().eq("id", id);
  if (error) {
    console.error(error);
  } else {
    projects.value = projects.value.filter((project) => project.id !== id);
  }
}

onMounted(async () => {
  const { data, error } = await $supabase.from("projects").select();
  if (error) {
    console.error(error);
  } else if (data) {
    projects.value = data;
  }
});
</script>

<template>
  <span v-if="loading">Loading...</span>
  <div v-else class="my-4">
    <h2>Projekte</h2>
    <ul class="project-list">
      <li v-for="project in projects" :key="project.id">
        <NuxtLink :href="'/project/' + project.id">{{
          project.title
        }}</NuxtLink>

        <button @click="deleteProject(project.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.project-list {
  list-style-type: none;
  padding: 0;

  & > li {
    @apply flex items-center p-2 border-b last:border-b-0 border-neutral-200;
    & > a {
      @apply flex-1;
    }
  }
}
</style>
