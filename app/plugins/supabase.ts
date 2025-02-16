import { createClient } from "@supabase/supabase-js";
import type { Database } from "~/types/database.types";

export default defineNuxtPlugin({
  name: "supabase",
  setup: () => {
    const config = useRuntimeConfig();
    const supabaseUrl = config.public.supabaseUrl;
    const supabaseAnonKey = config.public.supabaseAnonKey;

    const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

    console.debug("Supabase client created");

    return {
      provide: {
        supabase,
      },
    };
  },
});
