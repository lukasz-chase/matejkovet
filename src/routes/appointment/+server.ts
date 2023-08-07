import { json, error } from "@sveltejs/kit";

export const GET = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();
  console.log(session);
  if (!session) {
    // the user is not signed in
    throw error(401, { message: "Unauthorized" });
  }
  const { data } = await supabase.from("appointments").select("*");

  return json({ data });
};
