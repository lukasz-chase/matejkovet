import { supabase } from "$lib/supabaseClient";

export const load = async () => {
  let workingHours = [];
  const { data } = await supabase.from("workingHours").select("*").eq("id", 1);
  if (data) {
    delete data[0].id;
    workingHours = data[0];
  }
  return {
    workingHours,
  };
};
