import { error, fail } from "@sveltejs/kit";

export const load = async ({ locals: { getSession, supabase }, params }) => {
  const session = await getSession();
  const { id } = params;
  if (!session || id !== session.user.id) {
    throw error(401, { message: "Unauthorized" });
  }
  const { data: userProfile } = await supabase
    .from("profiles")
    .select()
    .eq("id", session.user.id);
  if (userProfile[0].role !== "admin") {
    throw error(401, { message: "Unauthorized" });
  }
  return {
    session,
  };
};
