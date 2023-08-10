import { supabase } from "$lib/supabaseClient";

export const load = async ({ data }: { data: any }) => {
  const { data: userProfile } = await supabase
    .from("profiles")
    .select()
    .eq("id", data.session!.user.id);

  return {
    userProfile: userProfile ? userProfile[0] : {},
  };
};
