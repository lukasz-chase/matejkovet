import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
  setTheme: async ({ url, cookies }) => {
    const newTheme = url.searchParams.get("theme");

    if (newTheme) {
      cookies.set("colortheme", newTheme, {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
  },
};
