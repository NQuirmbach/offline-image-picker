// middleware/auth.global.js
export default defineNuxtRouteMiddleware(async (to) => {
  // Falls der Nutzer bereits auf der Login-Seite ist, brauchen wir nichts zu tun.
  if (to.path === "login") {
    return;
  }

  // Zugriff auf den injizierten Supabase-Client
  const { $supabase } = useNuxtApp();

  // Hole die aktuelle Session.
  // (Hinweis: Abhängig von deiner Supabase-Version kann auch supabase.auth.session() verwendet werden;
  // hier wird die asynchrone Methode aus v2 verwendet.)
  const {
    data: { session },
  } = await $supabase.auth.getSession();

  // Wenn keine Session vorhanden ist, leite zur Login-Seite weiter
  if (!session) {
    return navigateTo("/login");
  }
});
