<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-gray-700">E-Mail</label>
          <input
            type="email"
            v-model="email"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>
        <div>
          <label class="block text-gray-700">Passwort</label>
          <input
            type="password"
            v-model="password"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold focus:outline-none focus:ring focus:ring-blue-200"
          >
            Login
          </button>
        </div>
      </form>
      <p v-if="errorMessage" class="mt-4 text-center text-red-600">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useNuxtApp, useRouter } from "#app";

const email = ref("");
const password = ref("");
const errorMessage = ref("");

const { $supabase } = useNuxtApp();
const router = useRouter();

const handleLogin = async () => {
  const { data, error } = await $supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    errorMessage.value = error.message;
  } else if (data.session) {
    router.push("/");
  }
};
</script>
