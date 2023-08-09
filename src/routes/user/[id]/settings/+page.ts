import { supabase } from "$lib/supabaseClient";

export const load = async ({ fetch, data, depends }) => {
  const { data: userProfile } = await supabase
    .from("profiles")
    .select()
    .eq("id", data.session!.user.id);

  return {
    userProfile: userProfile ? userProfile[0] : {},
  };
};
