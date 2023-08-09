import { supabase } from "$lib/supabaseClient";

export const load = async ({ fetch, data, depends }) => {
  const getHours = async (selectedDate: string) => {
    const possibleHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    const currentDate = new Date();
    const today = currentDate.toJSON().slice(0, 10);
    let currentHours = possibleHours;

    if (selectedDate === today) {
      const currentHour = currentDate.getHours();
      currentHours = possibleHours.filter((h) => h > currentHour);
    }

    const { data: appointments } = await supabase
      .from("appointments")
      .select()
      .eq("date", selectedDate);

    return currentHours.filter(
      (h) => !appointments?.some((a) => a.hour === `${h}:00:00`)
    );
  };
  const { data: userProfile } = await supabase
    .from("profiles")
    .select()
    .eq("id", data.session!.user.id);

  const selectedDate = new Date().toJSON().slice(0, 10);
  const hoursFiltered = await getHours(selectedDate);

  return {
    getHours,
    hoursFiltered,
    userProfile: userProfile ? userProfile[0] : {},
  };
};
