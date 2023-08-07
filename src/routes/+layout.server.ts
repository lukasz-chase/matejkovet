export const load = async ({ locals: { getSession }, cookies }) => {
  const colortheme = cookies.get("colortheme");
  return {
    session: await getSession(),
    colortheme,
  };
};
