import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from "$env/static/public";
import { createSupabaseLoadClient } from "@supabase/auth-helpers-sveltekit";
import type { Database } from "../database.types";

export const load = async ({ fetch, data, depends }) => {
  const colorTheme = data.colortheme || "business";
  depends("supabase:auth");

  const supabase = createSupabaseLoadClient<Database>({
    supabaseUrl: PUBLIC_SUPABASE_URL,
    supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
    event: { fetch },
    serverSession: data.session,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  let profile;
  if (session) {
    const { data: userProfile } = await supabase
      .from("profiles")
      .select()
      .eq("id", data.session!.user.id);
    profile = userProfile![0];
  }

  return { supabase, session, colorTheme, profile };
};
