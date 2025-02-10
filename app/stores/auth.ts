// stores/auth.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Session } from "@supabase/supabase-js";

export const useAuthStore = defineStore("auth", () => {
  const { $supabase } = useNuxtApp();

  const session = ref<Session | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  $supabase.auth.onAuthStateChange((message, e) => {
    console.debug("Auth state change", message);
    session.value = e;
  });

  async function login(email: string, password: string): Promise<boolean> {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: authError } =
        await $supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (authError) {
        error.value = authError.message;
      } else {
        session.value = data.session!;
        return true;
      }
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
    return false;
  }

  async function logout() {
    await $supabase.auth.signOut();
    session.value = null;
  }

  return { session, loading, error, login, logout };
});
