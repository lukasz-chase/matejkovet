import { supabase } from "$lib/supabaseClient";
import type { WorkingHours } from "$lib/types/WorkingHours.js";

export const load = async ({ data }) => {
  const getHours = async (selectedDate: string) => {
    const daysOfWeek: Array<keyof WorkingHours> = [
      "niedziela",
      "poniedziałek",
      "wtorek",
      "środa",
      "czwartek",
      "piątek",
      "sobota",
    ];
    const currentDate = new Date();
    const selectedDay = new Date(selectedDate);
    const day = daysOfWeek[selectedDay.getDay()];
    const today = currentDate.toJSON().slice(0, 10);
    let possibleHours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
    const { data: workingHours } = await supabase
      .from("workingHours")
      .select()
      .eq("id", 1);

    if (workingHours) {
      delete workingHours[0].id;
      const openHour = parseInt(workingHours[0][day].open.split(":")[0], 10);
      const closeHour = parseInt(workingHours[0][day].close.split(":")[0], 10);
      possibleHours = Array.from(
        { length: closeHour - openHour + 1 },
        (_, i) => i + openHour
      );
    }
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
