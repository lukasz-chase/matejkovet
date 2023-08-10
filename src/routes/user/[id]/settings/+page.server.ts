import { error, fail } from "@sveltejs/kit";

export const load = async ({ locals: { getSession } }) => {
  const session = await getSession();

  if (!session) {
    // the user is not signed in
    throw error(401, { message: "Unauthorized" });
  }

  return {
    session,
  };
};

export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      // the user is not signed in
      throw error(401, { message: "Unauthorized" });
    }
    // we are save, let the user create the post
    const formData = await request.formData();
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;

    if (!firstName || !lastName) {
      return fail(400, {
        lastName,
        firstName,
        fieldMissing: "wszystkie pola muszą być uzupełnione",
      });
    }
    const user_id = session.user.id;

    const { error: profilesError } = await supabase
      .from("profiles")
      .upsert({ id: user_id, first_name: firstName, last_name: lastName });
    if (profilesError) {
      return fail(500, {
        firstName,
        lastName,
        supabaseErrorMessage: profilesError.message,
      });
    }

    return { success: true, firstName, lastName };
  },
};
