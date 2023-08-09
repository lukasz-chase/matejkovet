import { fail, redirect } from "@sveltejs/kit";

export const actions = {
  register: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return fail(500, {
        message: "Inputs cant be empty",
        success: false,
        email,
      });
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return fail(500, {
        message: "Server error. Try again later.",
        success: false,
        email,
      });
    }

    return {
      message:
        "Please check your email for a magic link to log into the website.",
      success: true,
    };
  },
  login: async ({ request, url, locals: { supabase } }) => {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
      return fail(500, {
        message: "Pola nie mogą być puste",
        success: false,
        email,
      });
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return fail(500, {
        message: "Błąd, Spróbuj ponownie później",
        success: false,
        email,
      });
    }
    if (data) {
      throw redirect(303, "/");
    }
  },
};
