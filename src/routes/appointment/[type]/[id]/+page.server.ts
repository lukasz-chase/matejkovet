import { error, fail, redirect } from "@sveltejs/kit";
import { PRIVATE_BUCKET_URL } from "$env/static/private";
import { v4 as uuidv4 } from "uuid";

export const load = async ({ locals: { getSession }, params }) => {
  const session = await getSession();
  const { id } = params;
  if (!session || id !== session.user.id) {
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
    const appointmentId = formData.get("appointmentId") as string;
    const opinion = formData.get("opinion") as string;
    const file = formData.get("file") as File;
    const ratingValue = formData.get("rating") as string;
    const randomID = uuidv4();
    const fileName = `review-${randomID}`;

    if (!file || !ratingValue || !opinion) {
      return fail(400, {
        opinion,
        formError: "Pola nie mogą być puste",
      });
    }

    const { data: profileData } = await supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id);

    if (profileData?.length === 0) {
      return fail(500, {
        opinion,
        noUserDataError:
          "Aby wystawić opinie musisz najpierw uzupełnić swoje dane",
      });
    }

    const { error: storageError } = await supabase.storage
      .from("reviews")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (storageError) {
      return fail(500, {
        opinion,
        formError: storageError.message,
      });
    }
    const photoURL = `${PRIVATE_BUCKET_URL}/${fileName}`;

    const user_id = session.user.id;
    const { error: createReviewError } = await supabase.from("reviews").insert({
      name: profileData![0].first_name ?? "",
      surname: profileData![0].last_name ?? "",
      rating: ratingValue,
      user_id,
      comment: opinion,
      photoURL,
      appointment_id: appointmentId,
    });

    if (createReviewError) {
      return fail(500, {
        opinion,
        formError: createReviewError.message,
      });
    }
    const { error: appointmentError, data } = await supabase
      .from("appointments")
      .update({
        review: true,
      })
      .eq("id", appointmentId)
      .select();

    if (appointmentError) {
      return fail(500, {
        opinion,
        formError: appointmentError.message,
      });
    }

    return { success: true, modifiedAppointment: data };
  },
};
