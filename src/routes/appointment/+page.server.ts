import { error, fail } from "@sveltejs/kit";

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
    const hour = formData.get("hour") as number;
    const additionalInfo = formData.get("info") as string;
    const user_id = session.user.id;
    console.log(session);
    const { error: createAppointmentError, data: newAppointment } =
      await supabase
        .from("appointments")
        .insert({ date, hour, additionalInfo, user_id });

    if (createAppointmentError) {
      return fail(500, {
        supabaseErrorMessage: createAppointmentError.message,
      });
    }
    return {
      newAppointment,
    };
  },
};
