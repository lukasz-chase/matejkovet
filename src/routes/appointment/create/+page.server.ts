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
    const date = formData.get("date") as string;
    const hour = formData.get("hour") as string;
    const additionalInfo = formData.get("info") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    if (!hour || !firstName || !lastName) {
      console.log("error");
      return fail(400, {
        lastName,
        firstName,
        info: additionalInfo,
        fieldMissing: "imię, nazwisko,data i godzina to obowiązkowe pola",
      });
    }
    const user_id = session.user.id;

    const { error: createAppointmentError } = await supabase
      .from("appointments")
      .insert({ date, hour, info: additionalInfo, user_id });

    if (createAppointmentError) {
      return fail(500, {
        info: additionalInfo,
        supabaseErrorMessage: createAppointmentError.message,
      });
    }
    await supabase
      .from("profiles")
      .upsert({ id: user_id, first_name: firstName, last_name: lastName });

    return { success: true };
  },
};
