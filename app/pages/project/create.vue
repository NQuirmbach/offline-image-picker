<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const { $supabase, $router } = useNuxtApp();
const auth = useAuthStore();

const schema = yup.object({
  title: yup.string().required("Title is required"),
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});

const { value: title } = useField("title");

const submitForm = handleSubmit(async (values) => {
  console.log("Form submitted:", values);
  const res = await $supabase.from("projects").insert({
    title: values.title,
    user_id: auth.session!.user.id,
  });

  if (res.status === 201) {
    console.log("Project created:", res.data);
    $router.push("/");
  }
});
</script>

<template>
  <h1>Create new project</h1>
  <form @submit.prevent="submitForm">
    <div>
      <label for="title">Title</label>
      <input id="title" v-model="title" type="text" />
      <span v-if="errors.title" style="color: red">{{ errors.title }}</span>
    </div>
    <button type="submit">Create Project</button>
  </form>
</template>
