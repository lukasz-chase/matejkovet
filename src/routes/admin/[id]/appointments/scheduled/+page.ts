import { supabase } from "$lib/supabaseClient";

export const load = async ({ url }) => {
  const start = url.searchParams.get("start") ?? 0;
  const end = url.searchParams.get("end") ?? 10;
  const getAppointments = async (selectedDate: string) => {
    const { data: appointments, count } = await supabase
      .from("appointments")
      .select("*", { count: "exact" })
      .eq("date", selectedDate)
      .range(start, end)
      .order("date", { ascending: true })
      .order("hour", { ascending: true });
    const appointmentsCount = Array.from(
      { length: Math.floor((count ?? 0 - 10) / 10) },
      (_, i) => i + 1
    );
    return {
      appointmentsDB: appointments,
      appointmentsCountDB: appointmentsCount,
    };
  };
  const getUserProfile = async (id: string) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", id);

    return {
      profile: data![0],
    };
  };

  return {
    getAppointments,
    getUserProfile,
  };
};
