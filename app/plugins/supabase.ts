import { createClient } from "@supabase/supabase-js";

export default defineNuxtPlugin({
  name: "supabase",
  setup: () => {
    const config = useRuntimeConfig();
    const supabaseUrl = config.public.supabaseUrl;
    const supabaseAnonKey = config.public.supabaseAnonKey;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.debug("Supabase client created");

    return {
      provide: {
        supabase,
      },
    };
  },
});
