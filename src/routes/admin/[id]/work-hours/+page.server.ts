import type { WorkingHours } from "$lib/types/WorkingHours.js";
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

export const actions = {
  default: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();
    if (!session) {
      // the user is not signed in
      throw error(401, { message: "Unauthorized" });
    }

    const formData = await request.formData();
    const daysOfWeek: Array<keyof WorkingHours> = [
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
      "niedziela",
    ];
    const workingHours: WorkingHours = {} as WorkingHours;

    for (const day of daysOfWeek) {
      const open = formData.get(`${day}-open`) as string;
      const close = formData.get(`${day}-close`) as string;
      workingHours[day] = { open, close };
    }

    const { error: updateWorkingHoursError } = await supabase
      .from("workingHours")
      .upsert({ id: 1, ...workingHours });

    if (updateWorkingHoursError) {
      return fail(500, {
        supabaseErrorMessage: updateWorkingHoursError.message,
      });
    }

    return { success: true };
  },
};
